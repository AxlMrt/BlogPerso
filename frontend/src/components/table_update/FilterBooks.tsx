import { IBook } from "../../app/types";

interface Props {
  books: IBook[];
}

export default function FilterBooks({ books }: Props) {
  return (
		<div
			className={`hidden absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
    >
      {
        books.map((book, index) => {
          return <div className='py-1 px-4' key={index}>{book.type}</div>;
        })
      }
     
		</div>
	);
}
