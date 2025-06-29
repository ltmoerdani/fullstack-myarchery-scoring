import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const headingVariants = cva(
  "font-semibold tracking-tight",
  {
    variants: {
      level: {
        1: "text-4xl lg:text-5xl",
        2: "text-3xl lg:text-4xl",
        3: "text-2xl lg:text-3xl",
        4: "text-xl lg:text-2xl",
        5: "text-lg lg:text-xl",
        6: "text-base lg:text-lg"
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary-foreground"
      }
    },
    defaultVariants: {
      level: 1,
      color: "default"
    }
  }
)

type HeadingVariants = VariantProps<typeof headingVariants>

interface HeadingProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>, HeadingVariants {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, color, as, ...props }, ref) => {
    const Component = as || (`h${level}` as keyof JSX.IntrinsicElements)
    
    return React.createElement(
      Component,
      {
        ref,
        className: cn(headingVariants({ level, color, className })),
        ...props
      }
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
export type { HeadingProps }