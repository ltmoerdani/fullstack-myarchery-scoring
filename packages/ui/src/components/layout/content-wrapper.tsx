import * as React from "react"
import { cn } from "../../lib/utils"

interface ContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to apply conditional padding above 1440px
   * @default true
   */
  conditionalPadding?: boolean
  /**
   * Base padding for mobile and smaller screens
   * @default "px-4"
   */
  basePadding?: string
  /**
   * Additional padding for larger screens (above 1440px)
   * @default "px-8"
   */
  largePadding?: string
}

const ContentWrapper = React.forwardRef<HTMLDivElement, ContentWrapperProps>(
  ({ 
    className, 
    conditionalPadding = true,
    basePadding = "px-4",
    largePadding = "px-8",
    children,
    ...props 
  }, ref) => {
    if (conditionalPadding) {
      return (
        <div
          ref={ref}
          className={cn(
            "w-full transition-all duration-300 ease-in-out",
            // Apply base padding for screens <= 1440px
            "px-4 sm:px-6 lg:px-8",
            // For screens > 1440px, add minimal additional padding
            "xl:px-8",
            className
          )}
          style={{
            // Only add very minimal padding for screens above 1440px
            paddingLeft: 'clamp(1rem, calc((100vw - 1440px) * 0.02 + 2rem), 3rem)',
            paddingRight: 'clamp(1rem, calc((100vw - 1440px) * 0.02 + 2rem), 3rem)',
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
ContentWrapper.displayName = "ContentWrapper"

export { ContentWrapper }