import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  placeholder,
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      data-slot="input"
      className={cn(
        "outline-0 bg-(--light-gray) p-2.5 text-white",
        className
      )}
      {...props} />
  );
}

export { Input }
