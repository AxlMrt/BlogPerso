import { MouseEvent } from "react";

interface Props {
  order: string;
  orderChecked: string;
  row: string;
  type: string;
  changeSort: (e: MouseEvent<HTMLDivElement>, key: string) => void;
}

export default function FiltersInputs({
  order,
  orderChecked,
  row,
  type,
  changeSort,
}: Props) {
  return (
    <div
      className="w-full flex items-center rounded-sm hover:bg-gray-200 hover:text-gray-800 p-2"
      onClick={(e: MouseEvent<HTMLDivElement>) => changeSort(e, row)}
    >
      <input
        type="radio"
        className="w-4 h-4 text-blue-600  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        checked={order === orderChecked && type === row}
        readOnly
      />
      <label className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-900">
        {orderChecked === "asc" ? "Croissant" : "Décroissant"}
      </label>
    </div>
  );
}
