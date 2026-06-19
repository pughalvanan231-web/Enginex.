import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C38]/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[#FF8C38] text-white hover:bg-[#E67A2E] hover:shadow-lg hover:shadow-[#FF8C38]/20",
        secondary: "border border-[#E0E0E0] text-[#1A1A1A] hover:border-[#FF8C38]/30 hover:text-[#FF8C38] hover:bg-[#FF8C38]/03",
        ghost: "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]",
        outline: "border border-[#FF8C38]/30 text-[#FF8C38] hover:bg-[#FF8C38]/08",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        light: "bg-white text-[#1A1A1A] border border-[#E0E0E0] hover:shadow-md hover:shadow-[#FF8C38]/10",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
