interface Props {
  order: string;
  field: string;
  columnKey: string;
}

export function SortButton({ order, columnKey, field }: Props) {
  return (
    <button
      type="button"
      className={`${
        field === columnKey && order === "desc"
          ? "transform -scale-y-100"
          : undefined
      }`}
    >
      ▲
    </button>
  );
}
