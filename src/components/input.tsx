import { ComponentProps, forwardRef } from "react";
import { cn } from "../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        className={cn(
          "h-12 w-full max-w-96 rounded-md border border-slate-100 bg-transparent p-4 outline-none placeholder:text-zinc-500 focus-within:border-2 focus-within:border-indigo-500",
          className,
        )}
        ref={ref}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
