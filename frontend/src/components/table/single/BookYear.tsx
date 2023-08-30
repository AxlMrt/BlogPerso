import { ChangeEvent } from "react";
import { IBook } from "../../../app/types";

interface Props {
  book: IBook;
  updating: boolean;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>, bookId: string) => void;
}

export default function BookYear({ book, updating, onChangeInput }: Props) {
  return (
    <td className="w-4 p-4">
      <div className="flex items-center">
        {updating ? (
          <input
            type="number"
            name="year"
            className="w-16 bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1"
            placeholder={book.year ? book.year.toString() : "xxxx"}
            form="table_form"
            onChange={(e) => onChangeInput(e, book.id)}
          />
        ) : book.year ? (
          book.year
        ) : (
          "----"
        )}
      </div>
    </td>
  );
}
