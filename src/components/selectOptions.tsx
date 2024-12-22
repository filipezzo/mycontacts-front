interface SelectOptionsProps {
  isLoading: boolean;
  isError: boolean;
  options: { id: string; name: string }[];
  selectedValue?: string;
}

export function SelectOptions({
  isLoading,
  isError,
  options,
  selectedValue,
}: SelectOptionsProps) {
  if (isLoading) {
    return (
      <option value="" disabled>
        Carregando..
      </option>
    );
  }

  if (isError || options.length === 0) {
    return <option value="">algo odeu errado</option>;
  }

  return (
    <>
      <option value="" disabled>
        selecione
      </option>
      {options.map((option) => (
        <option
          value={option.id}
          key={option.id}
          selected={selectedValue === option.id}
        >
          {option.name}
        </option>
      ))}
    </>
  );
}
