import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-[#E0E0E0] bg-white px-4 py-2 text-sm text-[#1A1A1A] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#FF8C38]/30 focus:ring-2 focus:ring-[#FF8C38]/08 transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
