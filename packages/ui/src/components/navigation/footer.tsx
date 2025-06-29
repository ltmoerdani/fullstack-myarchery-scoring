import * as React from "react"
import { cn } from "../../lib/utils"
import { ContentWrapper } from "../layout/content-wrapper"
import { Flex } from "../layout/flex"
import { Text } from "../typography/text"

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  bordered?: boolean
  /**
   * Whether to use full-width layout with conditional padding
   * @default true
   */
  fullWidth?: boolean
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, bordered = true, fullWidth = true, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "w-full bg-background mt-auto",
          bordered && "border-t border-border",
          className
        )}
        {...props}
      >
        <ContentWrapper conditionalPadding={fullWidth}>
          <Flex align="center" justify="center" className="py-6">
            {children || (
              <Text size="sm" color="muted">
                © 2025 MyArchery. Designed & Developed by Reka Cipta Digital
              </Text>
            )}
          </Flex>
        </ContentWrapper>
      </footer>
    )
  }
)
Footer.displayName = "Footer"

export { Footer }