interface SelectOptionsProps {
  isLoading: boolean;
  isError: boolean;
  options: { id: string; name: string }[];
}

export function SelectOptions({
  isLoading,
  isError,
  options,
}: SelectOptionsProps) {
  if (isLoading) {
    return <option disabled>Carregando..</option>;
  }

  if (isError || options.length === 0) {
    return <option>algo odeu errado</option>;
  }

  return (
    <>
      <option value="" disabled>
        selecione
      </option>
      {options.map((option) => (
        <option value={option.id} key={option.id}>
          {option.name}
        </option>
      ))}
    </>
  );
}
