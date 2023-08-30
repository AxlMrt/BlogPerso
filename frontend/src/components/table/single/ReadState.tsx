import { ChangeEvent } from "react";
import { IBook, IsBookRead } from "../../../app/types";

interface Props {
  book: IBook;
  updating: boolean;
  onChangeInput: (e: ChangeEvent<HTMLSelectElement>, bookId: string) => void;
}

export default function ReadState({ book, updating, onChangeInput }: Props) {
  const readingState: IsBookRead = {
    NOT_READ: {
      color: "bg-red-600",
      text: "Non lu",
    },
    IN_PROGRESS: {
      color: "bg-orange-400",
      text: "En cours",
    },
    IS_READ: {
      color: "bg-green-500",
      text: "Lu",
    },
  };
  return (
    <td className="px-6 py-4">
      <div className="flex items-center">
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            readingState[book.isRead as keyof IsBookRead].color
          } mr-2`}
        ></div>{" "}
        {updating ? (
          <select
            className="bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1"
            form="table_form"
            name="isRead"
            defaultValue={book.isRead}
            onChange={(e) => onChangeInput(e, book.id)}
          >
            <option value="NOT_READ">Non lu</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="IS_READ">Lu</option>
          </select>
        ) : (
          readingState[book.isRead as keyof IsBookRead].text
        )}
      </div>
    </td>
  );
}
