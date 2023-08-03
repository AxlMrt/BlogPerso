import { IBook } from "../../app/types";
import SingleBook from "./single/SingleBook";

export default function TableBody({ books }: { books: IBook[]}) {
  return (
		<tbody>
			{books.map((book: IBook, index: number) => (
				<SingleBook book={book} key={index} />
			))}
		</tbody>
	);
}
