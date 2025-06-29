import * as React from "react"
import { cn } from "../../lib/utils"

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to use full-width layout with conditional padding
   * @default true
   */
  fullWidth?: boolean
  /**
   * Minimum height for the page
   * @default "min-h-screen"
   */
  minHeight?: string
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ 
    className, 
    fullWidth = true,
    minHeight = "min-h-screen",
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          minHeight,
          "w-full bg-background flex flex-col",
          fullWidth && "transition-all duration-300 ease-in-out",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PageLayout.displayName = "PageLayout"

const PageHeader = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "sticky top-0 z-50 border-b border-border",
        className
      )}
      {...props}
    />
  )
)
PageHeader.displayName = "PageHeader"

const PageMain = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <main
      ref={ref}
      className={cn("flex-1 w-full", className)}
      {...props}
    />
  )
)
PageMain.displayName = "PageMain"

const PageFooter = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(
        "w-full bg-background mt-auto border-t border-border",
        className
      )}
      {...props}
    />
  )
)
PageFooter.displayName = "PageFooter"

export { PageLayout, PageHeader, PageMain, PageFooter }