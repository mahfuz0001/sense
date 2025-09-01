/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "./config";
import { logger } from "./logger";

// Cache interface for different implementations
interface CacheProvider {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  clear(): Promise<void>;
  exists(key: string): Promise<boolean>;
  increment(key: string, amount?: number): Promise<number>;
  expire(key: string, ttl: number): Promise<void>;
  keys(pattern: string): Promise<string[]>;
}

// Memory cache implementation (fallback)
class MemoryCache implements CacheProvider {
  private cache = new Map<string, { value: unknown; expires: number }>();
  private timers = new Map<string, NodeJS.Timeout>();

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);

    if (!item) return null;

    if (Date.now() > item.expires) {
      this.delete(key);
      return null;
    }

    return item.value as T;
  }

  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    const expires = Date.now() + ttl * 1000;

    // Clear existing timer
    const existingTimer = this.timers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Set new value
    this.cache.set(key, { value, expires });

    // Set expiration timer
    const timer = setTimeout(() => this.delete(key), ttl * 1000);
    this.timers.set(key, timer);
  }

  async del(key: string): Promise<void> {
    this.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
  }

  async exists(key: string): Promise<boolean> {
    return (
      this.cache.has(key) && Date.now() <= (this.cache.get(key)?.expires || 0)
    );
  }

  async increment(key: string, amount: number = 1): Promise<number> {
    const current = (await this.get<number>(key)) || 0;
    const newValue = current + amount;
    await this.set(key, newValue);
    return newValue;
  }

  async expire(key: string, ttl: number): Promise<void> {
    const item = this.cache.get(key);
    if (item) {
      item.expires = Date.now() + ttl * 1000;

      // Update timer
      const existingTimer = this.timers.get(key);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const timer = setTimeout(() => this.delete(key), ttl * 1000);
      this.timers.set(key, timer);
    }
  }

  async keys(pattern: string): Promise<string[]> {
    const regex = new RegExp(pattern.replace(/\*/g, ".*"));
    return Array.from(this.cache.keys()).filter((key) => regex.test(key));
  }

  private delete(key: string) {
    this.cache.delete(key);
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
  }
}

// Redis cache implementation
class RedisCache implements CacheProvider {
  private client: unknown = null;
  private isConnected = false;

  private get redisClient(): any {
    return this.client as any;
  }

  constructor() {
    // Only initialize Redis in server environment
    if (typeof window === "undefined") {
      this.connect();
    }
  }

  private async connect() {
    try {
      if (!config.REDIS_URL) {
        throw new Error("Redis URL not configured");
      }

      // Dynamic import to avoid bundling issues
      const { createClient } = await import("redis");

      this.client = createClient({
        url: config.REDIS_URL,
        password: config.REDIS_PASSWORD,
        socket: {
          connectTimeout: 5000,
        },
      } as any);

      this.redisClient.on("error", (err: Error) => {
        logger.error("Redis connection error", { error: err.message });
        this.isConnected = false;
      });

      this.redisClient.on("connect", () => {
        logger.info("Redis connected");
        this.isConnected = true;
      });

      this.redisClient.on("disconnect", () => {
        logger.warn("Redis disconnected");
        this.isConnected = false;
      });

      await this.redisClient.connect();
    } catch (error) {
      logger.error("Redis initialization failed", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      this.isConnected = false;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected || !this.client) return null;

    try {
      const value = await this.redisClient.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error("Redis get error", { key, error });
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    if (!this.isConnected || !this.client) return;

    try {
      const serialized = JSON.stringify(value);
      await this.redisClient.setEx(key, ttl, serialized);
    } catch (error) {
      logger.error("Redis set error", { key, error });
    }
  }

  async del(key: string): Promise<void> {
    if (!this.isConnected || !this.client) return;

    try {
      await this.redisClient.del(key);
    } catch (error) {
      logger.error("Redis del error", { key, error });
    }
  }

  async clear(): Promise<void> {
    if (!this.isConnected || !this.client) return;

    try {
      await this.redisClient.flushAll();
    } catch (error) {
      logger.error("Redis clear error", { error });
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.isConnected || !this.client) return false;

    try {
      const result = await this.redisClient.exists(key);
      return result === 1;
    } catch (error) {
      logger.error("Redis exists error", { key, error });
      return false;
    }
  }

  async increment(key: string, amount: number = 1): Promise<number> {
    if (!this.isConnected || !this.client) return 0;

    try {
      return await this.redisClient.incrBy(key, amount);
    } catch (error) {
      logger.error("Redis increment error", { key, error });
      return 0;
    }
  }

  async expire(key: string, ttl: number): Promise<void> {
    if (!this.isConnected || !this.client) return;

    try {
      await this.redisClient.expire(key, ttl);
    } catch (error) {
      logger.error("Redis expire error", { key, error });
    }
  }

  async keys(pattern: string): Promise<string[]> {
    if (!this.isConnected || !this.client) return [];

    try {
      return await this.redisClient.keys(pattern);
    } catch (error) {
      logger.error("Redis keys error", { pattern, error });
      return [];
    }
  }
}

// Cache factory (simplified for initial deployment)
const createCache = (): CacheProvider => {
  // For now, use memory cache to avoid Redis dependency issues
  // TODO: Re-enable Redis cache for production deployment
  logger.info("Initializing memory cache (Redis temporarily disabled)");
  return new MemoryCache();
};

// Singleton cache instance
export const cache = createCache();

// Cache utilities
export const cacheUtils = {
  // Generate cache key
  key: (prefix: string, ...parts: (string | number)[]): string => {
    return `${prefix}:${parts.join(":")}`;
  },

  // Cache with auto-refresh
  getOrSet: async <T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 3600,
    refreshThreshold: number = 0.1
  ): Promise<T> => {
    const cached = await cache.get<{ data: T; timestamp: number }>(key);

    if (cached) {
      const age = Date.now() - cached.timestamp;
      const maxAge = ttl * 1000;

      // Return cached data immediately
      const result = cached.data;

      // Refresh in background if near expiration
      if (age > maxAge * (1 - refreshThreshold)) {
        setImmediate(async () => {
          try {
            const fresh = await fetcher();
            await cache.set(key, { data: fresh, timestamp: Date.now() }, ttl);
          } catch (error) {
            logger.error("Background cache refresh failed", { key, error });
          }
        });
      }

      return result;
    }

    // Fetch fresh data
    const data = await fetcher();
    await cache.set(key, { data, timestamp: Date.now() }, ttl);
    return data;
  },

  // Cache with tags for group invalidation
  setWithTags: async <T>(
    key: string,
    value: T,
    tags: string[],
    ttl: number = 3600
  ): Promise<void> => {
    await cache.set(key, value, ttl);

    // Store tag associations
    for (const tag of tags) {
      const tagKey = cacheUtils.key("tag", tag);
      const taggedKeys = (await cache.get<string[]>(tagKey)) || [];

      if (!taggedKeys.includes(key)) {
        taggedKeys.push(key);
        await cache.set(tagKey, taggedKeys, ttl * 2);
      }
    }
  },

  // Invalidate by tags
  invalidateByTag: async (tag: string): Promise<void> => {
    const tagKey = cacheUtils.key("tag", tag);
    const taggedKeys = (await cache.get<string[]>(tagKey)) || [];

    const promises = taggedKeys.map((key) => cache.del(key));
    promises.push(cache.del(tagKey));

    await Promise.all(promises);
    logger.info("Cache invalidated by tag", {
      tag,
      keysInvalidated: taggedKeys.length,
    });
  },

  // Distributed lock
  lock: async (
    lockKey: string,
    ttl: number = 30,
    retries: number = 3,
    retryDelay: number = 100
  ): Promise<boolean> => {
    for (let i = 0; i < retries; i++) {
      const acquired = !(await cache.exists(lockKey));

      if (acquired) {
        await cache.set(lockKey, Date.now(), ttl);
        return true;
      }

      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    return false;
  },

  // Release lock
  unlock: async (lockKey: string): Promise<void> => {
    await cache.del(lockKey);
  },

  // Cache statistics
  stats: async (): Promise<{
    type: string;
    connected: boolean;
    keyCount?: number;
    memoryUsage?: Record<string, unknown>;
  }> => {
    const isRedis = cache instanceof RedisCache;
    const connected = isRedis ? (cache as any).isConnected : true;

    let keyCount: number | undefined;
    let memoryUsage: Record<string, unknown> | undefined;

    try {
      const allKeys = await cache.keys("*");
      keyCount = allKeys.length;

      if (!isRedis) {
        memoryUsage = process.memoryUsage() as unknown as Record<
          string,
          unknown
        >;
      }
    } catch (error) {
      logger.error("Failed to get cache stats", { error });
    }

    return {
      type: isRedis ? "redis" : "memory",
      connected,
      keyCount,
      memoryUsage,
    };
  },
};
