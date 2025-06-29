import * as React from "react"
import { cn } from "../../lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
  /**
   * Whether to use edge-to-edge layout with conditional padding
   * @default false
   */
  edgeToEdge?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    className, 
    size = "lg", 
    edgeToEdge = false,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: "max-w-3xl",
      md: "max-w-5xl", 
      lg: "max-w-7xl",
      xl: "max-w-[1400px]",
      full: "max-w-full"
    }

    if (edgeToEdge) {
      return (
        <div
          ref={ref}
          className={cn(
            "w-full transition-all duration-300 ease-in-out",
            // Base padding for smaller screens
            "px-4 sm:px-6 lg:px-8",
            className
          )}
          style={{
            // Minimal additional padding only for very large screens
            paddingLeft: 'clamp(1rem, calc((100vw - 1440px) * 0.01 + 2rem), 2.5rem)',
            paddingRight: 'clamp(1rem, calc((100vw - 1440px) * 0.01 + 2rem), 2.5rem)',
          }}
          {...props}
        />
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }