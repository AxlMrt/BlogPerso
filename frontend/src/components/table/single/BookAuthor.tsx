import { IBook } from "../../../app/types";
import { ChangeEvent } from "react";

interface Props {
  book: IBook;
  updating: boolean;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>, bookId: string) => void;
}

export default function BookAuthor({ book, updating, onChangeInput }: Props) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-ellipsis overflow-hidden max-w-0">
      {updating ? (
        <input
          type="text"
          name="author"
          className="bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1"
          placeholder={book.author}
          form="table_form"
          onChange={(e) => onChangeInput(e, book.id)}
        />
      ) : (
        book.author
      )}
    </td>
  );
}
