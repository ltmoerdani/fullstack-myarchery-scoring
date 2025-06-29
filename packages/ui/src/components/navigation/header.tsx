import * as React from "react"
import { cn } from "../../lib/utils"
import { ContentWrapper } from "../layout/content-wrapper"
import { Flex } from "../layout/flex"

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean
  bordered?: boolean
  /**
   * Whether to use full-width layout with conditional padding
   * @default true
   */
  fullWidth?: boolean
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, sticky = false, bordered = true, fullWidth = true, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          sticky && "sticky top-0 z-50",
          bordered && "border-b border-border",
          className
        )}
        {...props}
      >
        <ContentWrapper conditionalPadding={fullWidth}>
          <Flex align="center" justify="between" className="h-16">
            {children}
          </Flex>
        </ContentWrapper>
      </header>
    )
  }
)
Header.displayName = "Header"

const HeaderLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center space-x-2", className)}
    {...props}
  />
))
HeaderLogo.displayName = "HeaderLogo"

const HeaderNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("hidden md:flex items-center space-x-6", className)}
    {...props}
  />
))
HeaderNav.displayName = "HeaderNav"

const HeaderActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center space-x-4", className)}
    {...props}
  />
))
HeaderActions.displayName = "HeaderActions"

export { Header, HeaderLogo, HeaderNav, HeaderActions }