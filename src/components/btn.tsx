import { ComponentProps, ReactNode } from "react";
import { cn } from "../app/utils/cn";

interface BtnProps extends ComponentProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Btn({
  children,
  className,
  variant = "primary",
  ...rest
}: BtnProps) {
  const defaultClasses =
    "outline-none max-w-full w-full rounded-md font-bold hover:opacity-80 transition-all";
  if (variant === "primary") {
    return (
      <button
        className={cn(
          defaultClasses,
          "h-14 bg-indigo-500 p-4 text-lg text-gray-100 disabled:cursor-not-allowed disabled:bg-zinc-500 disabled:hover:opacity-100",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        className={cn(
          defaultClasses,
          "flex h-12 items-center justify-center border border-indigo-500 bg-transparent text-indigo-500 disabled:bg-zinc-500",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
  return null;
}
