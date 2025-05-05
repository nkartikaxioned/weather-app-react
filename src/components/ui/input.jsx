import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "outline-0 bg-[#1e1e1e] p-2.5 text-white",
        className
      )}
      {...props} />
  );
}

export { Input }
