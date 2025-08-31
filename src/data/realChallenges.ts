import type { Challenge, LearningPath } from '../types';

// Real-world coding challenges that help developers escape tutorial hell
export const realChallenges: Challenge[] = [
  {
    id: 'interactive-dashboard',
    title: 'Real-Time Analytics Dashboard',
    description: `Build a responsive analytics dashboard that displays real-time metrics.

**Your Mission:**
Create a dashboard component that:
- Displays key metrics (users, revenue, conversion rate)
- Updates data in real-time (simulate with intervals)
- Has responsive grid layout
- Includes interactive charts
- Shows loading states and error handling

**No Hand-Holding:** You'll need to research data visualization libraries, state management patterns, and real-time updates. This is exactly the kind of problem you'll face in real development jobs.

**Skills You'll Build:**
- Component architecture
- State management
- Data visualization
- Real-time updates
- Error handling`,
    difficulty: 'advanced',
    category: 'React Components',
    starting_code: `import React, { useState, useEffect } from 'react';

// Define your metric interfaces
interface Metric {
  // Your implementation here
}

interface DashboardProps {
  // Your props here
}

const Dashboard: React.FC<DashboardProps> = () => {
  // Your component implementation
  
  return (
    <div className="dashboard">
      {/* Your dashboard UI here */}
    </div>
  );
};

export default Dashboard;`,
    solution_code: `import React, { useState, useEffect } from 'react';

interface Metric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

interface DashboardProps {
  updateInterval?: number;
}

const Dashboard: React.FC<DashboardProps> = ({ updateInterval = 3000 }) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateMetrics = (): Metric[] => [
    {
      id: 'users',
      title: 'Active Users',
      value: Math.floor(Math.random() * 10000) + 5000,
      change: (Math.random() - 0.5) * 20,
      trend: Math.random() > 0.5 ? 'up' : 'down'
    },
    {
      id: 'revenue',
      title: 'Revenue',
      value: Math.floor(Math.random() * 50000) + 25000,
      change: (Math.random() - 0.5) * 15,
      trend: Math.random() > 0.3 ? 'up' : 'down'
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: parseFloat((Math.random() * 5 + 2).toFixed(2)),
      change: (Math.random() - 0.5) * 2,
      trend: Math.random() > 0.4 ? 'up' : 'down'
    }
  ];

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMetrics(generateMetrics());
        setError(null);
      } catch (err) {
        setError('Failed to load metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  if (loading && metrics.length === 0) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {metrics.map(metric => (
        <div key={metric.id} className="metric-card p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold">{metric.title}</h3>
          <div className="text-2xl font-bold">{metric.value.toLocaleString()}</div>
          <div className={\`text-sm \${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}\`}>
            {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Component renders without crashing',
        expected_output: 'Dashboard component mounts successfully',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Displays metric cards in responsive grid',
        expected_output: 'Grid layout adapts to screen size',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Handles loading and error states',
        expected_output: 'Shows appropriate UI for different states',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Updates metrics in real-time',
        expected_output: 'Metrics refresh at specified intervals',
        hidden: true,
      },
    ],
    hints: [
      "Think about what data structure you need for metrics. What properties should each metric have?",
      "Real-time updates require useEffect with setInterval. Don't forget to clean up!",
      "Loading states improve user experience. When should you show them?",
      "Error handling is crucial in real apps. What could go wrong with data fetching?",
      "CSS Grid or Flexbox? Consider responsive behavior for different screen sizes.",
    ],
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'api-error-handling',
    title: 'Robust API Client with Error Recovery',
    description: `Create a production-ready API client that handles errors gracefully.

**Real-World Challenge:**
Build an API client that:
- Implements retry logic for failed requests
- Handles different types of errors (network, 4xx, 5xx)
- Includes request/response interceptors
- Provides meaningful error messages to users
- Supports timeout and cancellation

**Why This Matters:**
In production apps, network requests fail constantly. Your app needs to handle these gracefully without breaking the user experience.

**Skills You'll Master:**
- Error handling patterns
- Async/await with error recovery
- HTTP status code meanings
- User experience during failures
- Production-ready code practices`,
    difficulty: 'advanced',
    category: 'API Integration',
    starting_code: `// Build a robust API client with error handling
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string, timeout = 5000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  async request(endpoint: string, options?: RequestInit) {
    // Implement your robust request logic here
  }

  async get(endpoint: string) {
    // Implement GET method
  }

  async post(endpoint: string, data: any) {
    // Implement POST method
  }

  // Add retry logic, error handling, etc.
}

export default ApiClient;`,
    solution_code: `interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

interface ApiError {
  message: string;
  status?: number;
  code?: string;
  retryable: boolean;
}

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;
  private defaultRetries: number;

  constructor(baseURL: string, timeout = 5000, retries = 3) {
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
    this.defaultRetries = retries;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private createError(message: string, status?: number, retryable = false): ApiError {
    return { message, status, retryable };
  }

  private isRetryableError(error: any): boolean {
    // Network errors
    if (error.name === 'TypeError' || error.message.includes('fetch')) {
      return true;
    }
    
    // Server errors (5xx) are retryable
    if (error.status >= 500) {
      return true;
    }
    
    // Rate limiting
    if (error.status === 429) {
      return true;
    }
    
    return false;
  }

  async request(endpoint: string, options: RequestOptions = {}): Promise<any> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      retryDelay = 1000,
      ...fetchOptions
    } = options;

    const url = \`\${this.baseURL}\${endpoint}\`;
    let lastError: any;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const error = this.createError(
            errorData.message || \`HTTP \${response.status}: \${response.statusText}\`,
            response.status,
            this.isRetryableError({ status: response.status })
          );
          
          if (!error.retryable || attempt === retries) {
            throw error;
          }
          
          lastError = error;
          await this.sleep(retryDelay * Math.pow(2, attempt));
          continue;
        }

        return await response.json();
      } catch (error: any) {
        lastError = error;
        
        if (error.name === 'AbortError') {
          throw this.createError('Request timeout', undefined, true);
        }
        
        if (!this.isRetryableError(error) || attempt === retries) {
          throw error;
        }
        
        await this.sleep(retryDelay * Math.pow(2, attempt));
      }
    }

    throw lastError;
  }

  async get(endpoint: string, options?: RequestOptions) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint: string, data: any, options?: RequestOptions) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any, options?: RequestOptions) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string, options?: RequestOptions) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export default ApiClient;`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Handles successful API responses',
        expected_output: 'Returns parsed JSON data',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Implements retry logic for failed requests',
        expected_output: 'Retries failed requests with exponential backoff',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Handles different HTTP error codes appropriately',
        expected_output: 'Distinguishes between retryable and non-retryable errors',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Implements request timeout',
        expected_output: 'Cancels requests that exceed timeout',
        hidden: true,
      },
      {
        id: 'test-5',
        description: 'Provides meaningful error messages',
        expected_output: 'Error objects contain useful information for debugging',
        hidden: true,
      },
    ],
    hints: [
      "HTTP status codes have meaning: 4xx = client error (don't retry), 5xx = server error (retry).",
      "Exponential backoff prevents overwhelming a failing server: delay *= 2^attempt.",
      "AbortController lets you cancel fetch requests for timeouts.",
      "Always clean up timeouts to prevent memory leaks.",
      "Consider what makes an error 'retryable' vs 'permanent'.",
    ],
    created_at: '2024-01-20T00:00:00Z',
  },
  {
    id: 'custom-hook-data-fetching',
    title: 'Smart Data Fetching Hook',
    description: `Create a reusable React hook for data fetching with caching and error handling.

**The Challenge:**
Build a custom hook that:
- Fetches data from any API endpoint
- Caches responses to avoid duplicate requests
- Handles loading, error, and success states
- Supports manual refetching
- Automatically refetches on component mount
- Provides stale-while-revalidate behavior

**Real-World Application:**
This is the type of hook that powers production apps. You're essentially building a mini version of libraries like SWR or React Query.

**Skills You'll Develop:**
- Custom React hooks
- Caching strategies
- State management patterns
- Performance optimization
- Reusable code architecture`,
    difficulty: 'intermediate',
    category: 'React Components',
    starting_code: `import { useState, useEffect, useRef } from 'react';

interface UseApiOptions {
  // Define your options interface
}

interface UseApiReturn<T> {
  // Define your return type
}

function useApi<T>(url: string, options?: UseApiOptions): UseApiReturn<T> {
  // Implement your data fetching hook
  
  return {
    // Your return object
  };
}

export default useApi;`,
    solution_code: `import { useState, useEffect, useRef, useCallback } from 'react';

interface UseApiOptions {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  retryOnMount?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  isStale: boolean;
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number; }>();

function useApi<T>(url: string, options: UseApiOptions = {}): UseApiReturn<T> {
  const {
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheTime = 10 * 60 * 1000, // 10 minutes
    retryOnMount = true,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isStale, setIsStale] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  // Check if cached data exists and is fresh
  const getCachedData = useCallback(() => {
    const cached = cache.get(url);
    if (!cached) return null;
    
    const now = Date.now();
    const isExpired = now - cached.timestamp > cacheTime;
    const isStale = now - cached.timestamp > staleTime;
    
    if (isExpired) {
      cache.delete(url);
      return null;
    }
    
    return { data: cached.data, isStale };
  }, [url, staleTime, cacheTime]);

  const fetchData = useCallback(async (showLoading = true) => {
    if (!enabled) return;

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      const response = await fetch(url, { signal });
      
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const result = await response.json();

      if (!mountedRef.current) return;

      // Update cache
      cache.set(url, {
        data: result,
        timestamp: Date.now(),
      });

      setData(result);
      setIsStale(false);
      onSuccess?.(result);
    } catch (err) {
      if (!mountedRef.current) return;
      
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Request was cancelled
      }

      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      onError?.(error);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [url, enabled, onSuccess, onError]);

  const refetch = useCallback(() => fetchData(true), [fetchData]);

  useEffect(() => {
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Check cache first
    const cached = getCachedData();
    
    if (cached) {
      setData(cached.data);
      setIsStale(cached.isStale);
      
      // If data is stale, fetch in background
      if (cached.isStale) {
        fetchData(false);
      }
    } else {
      // No cache, fetch with loading state
      fetchData(true);
    }
  }, [url, enabled, getCachedData, fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    isStale,
  };
}

export default useApi;`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Fetches data on mount',
        expected_output: 'Hook initiates fetch request when component mounts',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Manages loading, error, and success states',
        expected_output: 'Hook provides appropriate state for each phase',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Implements caching mechanism',
        expected_output: 'Cached data is returned on subsequent calls',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Supports manual refetching',
        expected_output: 'refetch function triggers new API call',
        hidden: true,
      },
      {
        id: 'test-5',
        description: 'Handles component unmounting properly',
        expected_output: 'Cancels requests and cleans up on unmount',
        hidden: true,
      },
    ],
    hints: [
      "Think about what state you need to track: data, loading, error. What else?",
      "Caching requires storing data with timestamps. When is data considered stale?",
      "AbortController helps cancel fetch requests when components unmount.",
      "useCallback prevents infinite re-renders in useEffect dependencies.",
      "Consider the user experience: when should you show loading states?",
    ],
    created_at: '2024-01-25T00:00:00Z',
  },
  {
    id: 'performance-optimization',
    title: 'High-Performance React List',
    description: `Optimize a React component to handle thousands of items efficiently.

**Performance Challenge:**
You have a list component that needs to display 10,000+ items smoothly. Your job:
- Implement virtual scrolling for performance
- Add search/filtering without blocking the UI
- Use memoization to prevent unnecessary re-renders
- Debounce search input
- Measure and optimize render times

**Why This Matters:**
Performance problems kill user experience. In real apps, you'll encounter large datasets that need smooth interactions.

**Skills You'll Master:**
- Virtual scrolling concepts
- React.memo and useMemo
- Performance profiling
- Debouncing and throttling
- Web Workers for heavy computations`,
    difficulty: 'advanced',
    category: 'React Components',
    starting_code: `import React, { useState, useMemo } from 'react';

interface ListItem {
  id: string;
  name: string;
  description: string;
  value: number;
}

interface PerformantListProps {
  items: ListItem[];
  onItemClick?: (item: ListItem) => void;
}

const PerformantList: React.FC<PerformantListProps> = ({ items, onItemClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Implement your performance optimizations here
  
  return (
    <div className="performant-list">
      <input 
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="list-container">
        {/* Your optimized list implementation */}
      </div>
    </div>
  );
};

export default PerformantList;`,
    solution_code: `import React, { useState, useMemo, useCallback, memo } from 'react';

interface ListItem {
  id: string;
  name: string;
  description: string;
  value: number;
}

interface PerformantListProps {
  items: ListItem[];
  onItemClick?: (item: ListItem) => void;
}

// Memoized list item component
const ListItemComponent = memo<{
  item: ListItem;
  onClick?: (item: ListItem) => void;
}>(({ item, onClick }) => {
  const handleClick = useCallback(() => {
    onClick?.(item);
  }, [item, onClick]);

  return (
    <div 
      className="list-item p-3 border-b cursor-pointer hover:bg-gray-50"
      onClick={handleClick}
    >
      <div className="font-semibold">{item.name}</div>
      <div className="text-sm text-gray-600">{item.description}</div>
      <div className="text-lg font-bold text-blue-600">\${item.value}</div>
    </div>
  );
});

// Custom hook for debounced search
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Virtual scrolling hook
function useVirtualScrolling(
  items: any[],
  containerHeight: number,
  itemHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
  };
}

const PerformantList: React.FC<PerformantListProps> = ({ items, onItemClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoized filtered items
  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm) return items;
    
    return items.filter(item =>
      item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [items, debouncedSearchTerm]);

  // Virtual scrolling setup
  const ITEM_HEIGHT = 80;
  const CONTAINER_HEIGHT = 400;
  
  const {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
  } = useVirtualScrolling(filteredItems, CONTAINER_HEIGHT, ITEM_HEIGHT);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, [setScrollTop]);

  // Memoized click handler
  const handleItemClick = useCallback((item: ListItem) => {
    onItemClick?.(item);
  }, [onItemClick]);

  return (
    <div className="performant-list">
      <div className="search-container p-4">
        <input 
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <div className="text-sm text-gray-600 mt-2">
          Showing {filteredItems.length} of {items.length} items
        </div>
      </div>
      
      <div 
        className="list-container overflow-auto"
        style={{ height: CONTAINER_HEIGHT }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div 
            style={{
              transform: \`translateY(\${offsetY}px)\`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {visibleItems.map((item, index) => (
              <div key={item.id} style={{ height: ITEM_HEIGHT }}>
                <ListItemComponent 
                  item={item}
                  onClick={handleItemClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformantList;`,
    test_cases: [
      {
        id: 'test-1',
        description: 'Renders large lists without performance issues',
        expected_output: 'Smooth scrolling with thousands of items',
        hidden: false,
      },
      {
        id: 'test-2',
        description: 'Implements debounced search functionality',
        expected_output: 'Search input is debounced to prevent excessive filtering',
        hidden: false,
      },
      {
        id: 'test-3',
        description: 'Uses memoization to prevent unnecessary re-renders',
        expected_output: 'Components only re-render when necessary',
        hidden: false,
      },
      {
        id: 'test-4',
        description: 'Implements virtual scrolling',
        expected_output: 'Only visible items are rendered in DOM',
        hidden: true,
      },
      {
        id: 'test-5',
        description: 'Handles item clicks efficiently',
        expected_output: 'Click handlers are optimized with useCallback',
        hidden: true,
      },
    ],
    hints: [
      "Virtual scrolling only renders visible items. Calculate which items are in view based on scroll position.",
      "React.memo prevents re-renders when props haven't changed. What components should be memoized?",
      "Debouncing delays execution until after events stop firing. Useful for search inputs!",
      "useCallback memoizes functions to prevent child re-renders.",
      "Consider using Web Workers for heavy computations like complex filtering.",
    ],
    created_at: '2024-01-30T00:00:00Z',
  },
];

// Learning paths that structure the challenges progressively
export const realLearningPaths: LearningPath[] = [
  {
    id: 'react-mastery',
    title: 'React Component Mastery',
    description: 'Master React patterns through real-world challenges that you\'ll face in production applications.',
    challenges: [
      'custom-hook-data-fetching',
      'interactive-dashboard', 
      'performance-optimization'
    ],
    estimated_hours: 15,
    difficulty: 'intermediate',
    prerequisites: ['Basic React knowledge', 'JavaScript ES6+', 'Basic TypeScript'],
    learning_objectives: [
      'Build reusable custom hooks',
      'Create interactive dashboard components',
      'Optimize performance for large datasets',
      'Understand React rendering patterns',
      'Master state management techniques'
    ],
    order_index: 1,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-30T00:00:00Z',
  },
  {
    id: 'production-ready-apis',
    title: 'Production-Ready API Integration',
    description: 'Build robust API clients that handle real-world scenarios like network failures, retries, and error recovery.',
    challenges: [
      'api-error-handling',
      'custom-hook-data-fetching'
    ],
    estimated_hours: 10,
    difficulty: 'advanced',
    prerequisites: ['Promise/async-await', 'HTTP protocol basics', 'Error handling patterns'],
    learning_objectives: [
      'Implement robust error handling',
      'Build retry mechanisms with exponential backoff', 
      'Handle different types of API failures',
      'Create reusable data fetching patterns',
      'Understand production API considerations'
    ],
    order_index: 2,
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-25T00:00:00Z',
  },
  {
    id: 'performance-engineering',
    title: 'Frontend Performance Engineering',
    description: 'Learn to identify and solve performance bottlenecks that affect real user experiences.',
    challenges: [
      'performance-optimization',
      'interactive-dashboard'
    ],
    estimated_hours: 12,
    difficulty: 'advanced',
    prerequisites: ['React profiling tools', 'Browser DevTools', 'Performance measurement'],
    learning_objectives: [
      'Master virtual scrolling techniques',
      'Implement efficient search and filtering',
      'Use React profiling tools effectively',
      'Optimize re-rendering patterns',
      'Understand browser performance metrics'
    ],
    order_index: 3,
    created_at: '2024-01-25T00:00:00Z',
    updated_at: '2024-01-30T00:00:00Z',
  },
];

export default realChallenges;