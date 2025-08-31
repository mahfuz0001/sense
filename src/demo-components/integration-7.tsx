"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import useMeasure from "react-use-measure";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  GitMerge,
  Container,
  CodeXml,
  Database,
  Bot,
  PenTool,
  Shapes,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const VscodeLogo = () => <CodeXml className="size-full" />;
const GitLogo = () => <GitMerge className="size-full" />;
const DockerLogo = () => <Container className="size-full" />;
const PostgresLogo = () => <Database className="size-full" />;
const NpmLogo = () => <Bot className="size-full" />;
const PenpotLogo = () => <PenTool className="size-full" />; // Open source design tool
const MainLogoIcon = () => <Shapes className="size-full" />; // Generic logo for the center

// --- Placeholder for Next.js Link component ---
// In a real Next.js app, you would use `import Link from 'next/link';`
const Link = ({ href, children, ...props }: React.ComponentProps<"a">) => (
  <a href={href} {...props}>
    {children}
  </a>
);

// --- Placeholder for shadcn/ui Button component ---
// In a real project, you would have this component defined in your UI library.
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    variant?: string;
    size?: string;
  }
>(({ className, asChild = false, variant, size, ...props }, ref) => {
  // Basic styling to mimic the original look
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClasses =
    "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground";
  const sizeClasses = "h-9 px-3 py-2";
  
  if (asChild) {
    const { 
      onDrag, 
      onDragEnd, 
      onDragStart, 
      onAnimationStart, 
      onAnimationEnd,
      onToggle,
      form,
      formAction,
      formEncType,
      formMethod,
      formNoValidate,
      formTarget,
      disabled,
      type,
      value,
      ...safeProps 
    } = props;
    return (
      <motion.div
        className={cn(baseClasses, variantClasses, sizeClasses, className)}
        {...(safeProps as Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd'>)}
      />
    );
  }
  
  return (
    <button
      className={cn(baseClasses, variantClasses, sizeClasses, className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// --- Infinite Slider Component ---
export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const size = direction === "horizontal" ? width : height;
    if (size === 0) return; // Don't start animation until size is measured

    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    const distanceToTravel = Math.abs(to - from);
    const duration = distanceToTravel / currentSpeed;

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to);
      const transitionDuration = remainingDistance / currentSpeed;

      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      // Set initial position before starting the loop
      translation.set(from);
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return () => controls?.stop();
  }, [
    key,
    translation,
    currentSpeed,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// --- Integration Card Component ---
const IntegrationCard = ({
  children,
  className,
  isCenter = false,
}: {
  children: React.ReactNode;
  className?: string;
  isCenter?: boolean;
}) => {
  return (
    <div
      className={cn(
        "bg-background relative z-20 flex size-12 items-center justify-center rounded-full border",
        className
      )}
    >
      <div
        className={cn(
          "m-auto size-fit text-muted-foreground *:size-5",
          isCenter && "*:size-8"
        )}
      >
        {children}
      </div>
    </div>
  );
};

// --- Main Exported Component ---
export default function IntegrationsSection() {
  return (
    <section>
      <div className="bg-muted dark:bg-background py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="bg-muted/25 group relative mx-auto max-w-[22rem] items-center justify-between space-y-6 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] sm:max-w-md">
            <div
              role="presentation"
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] opacity-50 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"
            ></div>

            {/* Slider Row 1 */}
            <div>
              <InfiniteSlider gap={24} speed={20} speedOnHover={10}>
                <IntegrationCard>
                  <VscodeLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <GitLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <DockerLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <PostgresLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <NpmLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <PenpotLogo />
                </IntegrationCard>
              </InfiniteSlider>
            </div>

            {/* Slider Row 2 */}
            <div>
              <InfiniteSlider gap={24} speed={20} speedOnHover={10} reverse>
                <IntegrationCard>
                  <PostgresLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <DockerLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <PenpotLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <VscodeLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <NpmLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <GitLogo />
                </IntegrationCard>
              </InfiniteSlider>
            </div>

            {/* Slider Row 3 */}
            <div>
              <InfiniteSlider gap={24} speed={20} speedOnHover={10}>
                <IntegrationCard>
                  <NpmLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <PenpotLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <GitLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <DockerLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <VscodeLogo />
                </IntegrationCard>
                <IntegrationCard>
                  <PostgresLogo />
                </IntegrationCard>
              </InfiniteSlider>
            </div>

            {/* Center Logo */}
            <div className="absolute inset-0 m-auto flex size-fit justify-center gap-2">
              <IntegrationCard
                className="shadow-black-950/10 size-16 bg-white/25 shadow-xl backdrop-blur-md backdrop-grayscale dark:border-white/10 dark:bg-black/25 dark:shadow-white/15"
                isCenter={true}
              >
                <MainLogoIcon />
              </IntegrationCard>
            </div>
          </div>

          {/* Text Content */}
          <div className="mx-auto mt-12 max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              Integrate with your favorite tools
            </h2>
            <p className="text-muted-foreground">
              Connect seamlessly with popular platforms and services to enhance
              your workflow.
            </p>

            <Button variant="outline" size="sm" asChild>
              <Link href="#">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
