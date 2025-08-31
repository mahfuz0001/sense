import React, { memo, useId, forwardRef, ReactNode } from "react";
import { motion, LazyMotion, domAnimation } from "framer-motion";

// Utility
export const cn = (...classes: (string | undefined | null | boolean)[]) =>
  classes.filter(Boolean).join(" ");

// Icon container
interface IconContainerProps {
  children: ReactNode;
  variant: "left" | "center" | "right";
  className?: string;
  theme?: "light" | "dark" | "neutral";
}

const ICON_VARIANTS = {
  left: {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: -6,
      transition: { duration: 0.4, delay: 0.1 },
    },
    hover: { x: -22, y: -5, rotate: -15, scale: 1.1 },
  },
  center: {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, delay: 0.2 },
    },
    hover: { y: -10, scale: 1.15 },
  },
  right: {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 6,
      transition: { duration: 0.4, delay: 0.3 },
    },
    hover: { x: 22, y: -5, rotate: 15, scale: 1.1 },
  },
};

const IconContainer = memo(
  ({ children, variant, className = "", theme }: IconContainerProps) => (
    <motion.div
      variants={ICON_VARIANTS[variant]}
      className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center relative shadow-lg",
        theme === "dark" && "bg-neutral-800 border border-neutral-700",
        theme === "neutral" && "bg-stone-100 border border-stone-200",
        (!theme || theme === "light") && "bg-white border border-gray-200",
        className
      )}
    >
      <div
        className={cn(
          "text-sm",
          theme === "dark" && "text-neutral-400",
          theme === "neutral" && "text-stone-500",
          (!theme || theme === "light") && "text-gray-500"
        )}
      >
        {children}
      </div>
    </motion.div>
  )
);
IconContainer.displayName = "IconContainer";

// MultiIconDisplay
interface MultiIconDisplayProps {
  icons: React.ReactNode[];
  theme?: "light" | "dark" | "neutral";
}

const MultiIconDisplay = memo(({ icons, theme }: MultiIconDisplayProps) => {
  if (!icons || icons.length < 3) return null;

  return (
    <div className="flex justify-center isolate relative">
      <IconContainer variant="left" className="left-2 top-1 z-10" theme={theme}>
        {icons[0]}
      </IconContainer>
      <IconContainer variant="center" className="z-20" theme={theme}>
        {icons[1]}
      </IconContainer>
      <IconContainer
        variant="right"
        className="right-2 top-1 z-10"
        theme={theme}
      >
        {icons[2]}
      </IconContainer>
    </div>
  );
});
MultiIconDisplay.displayName = "MultiIconDisplay";

// Background
const Background = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500"
    style={{
      backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 1px)`,
      backgroundSize: "24px 24px",
    }}
  />
);

// Action props
interface ActionProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

// EmptyState props
interface EmptyStateProps {
  title?: string;
  description?: string;
  icons?: ReactNode[];
  action?: ActionProps | ReactNode; // ✅ structured OR JSX
  variant?: "default" | "ghost" | "minimal";
  size?: "sm" | "default" | "lg";
  theme?: "light" | "dark" | "neutral";
  isIconAnimated?: boolean;
  className?: string;
}

const CONTENT_VARIANTS = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.2 } },
};
const BUTTON_VARIANTS = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.3 } },
};

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      title,
      description,
      icons,
      action,
      variant = "default",
      size = "default",
      theme = "light",
      isIconAnimated = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const titleId = useId();
    const descriptionId = useId();

    const sizeClasses: Record<string, string> = {
      sm: "p-6",
      default: "p-8",
      lg: "p-12",
    };

    const getButtonClasses = (size: string, theme: string) => {
      const sizeMap: Record<string, string> = {
        sm: "text-xs px-3 py-1.5",
        default: "text-sm px-4 py-2",
        lg: "text-base px-6 py-3",
      };
      const themeMap: Record<string, string> = {
        light: "border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
        dark: "border-neutral-600 bg-neutral-800 hover:bg-neutral-700 text-neutral-200",
        neutral:
          "border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-700",
      };
      return cn(
        "inline-flex items-center gap-2 border rounded-md font-medium shadow-sm hover:shadow-md",
        sizeMap[size] || sizeMap.default,
        themeMap[theme] || themeMap.light
      );
    };

    return (
      <LazyMotion features={domAnimation}>
        <motion.section
          ref={ref}
          role="region"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cn(
            "group rounded-xl relative overflow-hidden text-center flex flex-col items-center justify-center",
            sizeClasses[size] || sizeClasses.default,
            className
          )}
          initial="initial"
          animate="animate"
          whileHover={isIconAnimated ? "hover" : "animate"}
          {...props}
        >
          <Background />

          <div className="relative z-10 flex flex-col items-center">
            {icons && (
              <div className="mb-6">
                <MultiIconDisplay icons={icons} theme={theme} />
              </div>
            )}

            {(title || description) && (
              <motion.div
                variants={CONTENT_VARIANTS}
                className="space-y-2 mb-6"
              >
                {title && (
                  <h2 id={titleId} className="text-lg font-semibold">
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id={descriptionId}
                    className="text-sm text-gray-600 max-w-md"
                  >
                    {description}
                  </p>
                )}
              </motion.div>
            )}

            {action && (
              <motion.div variants={BUTTON_VARIANTS}>
                {typeof action === "object" && "label" in action ? (
                  <motion.button
                    type="button"
                    onClick={action.onClick}
                    disabled={action.disabled}
                    className={getButtonClasses(size, theme)}
                    whileTap={{ scale: 0.98 }}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </motion.button>
                ) : (
                  <>{action}</>
                )}
              </motion.div>
            )}
          </div>
        </motion.section>
      </LazyMotion>
    );
  }
);
EmptyState.displayName = "EmptyState";
