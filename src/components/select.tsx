import { ComponentProps, forwardRef, useEffect, useState } from "react";
import { API } from "../app/router/api";
import { cn } from "../app/utils/cn";
import { SelectOptions } from "./selectOptions";

interface SelectProps extends ComponentProps<"select"> {
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...rest }, ref) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOptions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API.BASEURL}${API.CATEGORIES}`);
        if (!response.ok) {
          throw new Error("Algo deu errado");
        }
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          return;
        }
        setError("Erro inesperado");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchOptions();
    }, []);
    return (
      <select
        className={cn(
          "h-12 w-full max-w-96 cursor-pointer rounded-md border border-slate-100 bg-transparent px-4 outline-none placeholder:text-zinc-500 focus-within:border-2 focus-within:border-indigo-500",
          className,
        )}
        ref={ref}
        {...rest}
      >
        <SelectOptions
          options={options}
          isLoading={loading}
          isError={!!error}
        />
      </select>
    );
  },
);
