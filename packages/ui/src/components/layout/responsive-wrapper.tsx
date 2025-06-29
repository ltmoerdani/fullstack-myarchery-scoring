import * as React from "react"
import { cn } from "../../lib/utils"

interface ResponsiveWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to apply horizontal padding only above 1440px
   * @default true
   */
  conditionalPadding?: boolean
  /**
   * Maximum padding for very large screens
   * @default 2.5rem
   */
  maxPadding?: string
}

const ResponsiveWrapper = React.forwardRef<HTMLDivElement, ResponsiveWrapperProps>(
  ({ 
    className, 
    conditionalPadding = true, 
    maxPadding = "2.5rem",
    children,
    ...props 
  }, ref) => {
    if (conditionalPadding) {
      return (
        <div
          ref={ref}
          className={cn(
            "w-full transition-all duration-300 ease-in-out",
            // Standard padding for screens <= 1440px
            "px-4 sm:px-6 lg:px-8",
            className
          )}
          style={{
            // Very conservative additional padding for large screens
            paddingLeft: `clamp(1rem, calc((100vw - 1440px) * 0.015 + 2rem), ${maxPadding})`,
            paddingRight: `clamp(1rem, calc((100vw - 1440px) * 0.015 + 2rem), ${maxPadding})`,
          }}
          {...props}
        >
          {children}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full px-4 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ResponsiveWrapper.displayName = "ResponsiveWrapper"

export { ResponsiveWrapper }