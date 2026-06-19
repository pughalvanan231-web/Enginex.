import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, options, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-12 w-full rounded-xl border border-[#E0E0E0] bg-white px-4 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#FF8C38]/30 focus:ring-2 focus:ring-[#FF8C38]/08 transition-all duration-500 cursor-pointer appearance-none",
        className
      )}
      ref={ref}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
})
Select.displayName = "Select"

export { Select }
