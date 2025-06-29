import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const textVariants = cva(
  "",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl"
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold"
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        destructive: "text-destructive"
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify"
      }
    },
    defaultVariants: {
      size: "base",
      weight: "normal",
      color: "default",
      align: "left"
    }
  }
)

type TextElement = HTMLParagraphElement
type TextVariants = VariantProps<typeof textVariants>

interface TextProps extends Omit<React.HTMLAttributes<TextElement>, keyof TextVariants> {
  as?: "p" | "span" | "div" | "label"
  size?: TextVariants['size']
  weight?: TextVariants['weight']
  color?: TextVariants['color']
  align?: TextVariants['align']
}

const Text = React.forwardRef<TextElement, TextProps>(
  ({ className, size = "base", weight = "normal", color = "default", align = "left", as = "p", ...props }, ref) => {
    const Component = as
    
    return React.createElement(
      Component,
      {
        ref,
        className: cn(textVariants({ size, weight, color, align, className })),
        ...props
      }
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants }
export type { TextProps }