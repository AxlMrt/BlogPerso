import { IBook } from '../../app/types';

interface Props {
  books: IBook[]
}

export default function ReadingProgress({ books }: Props) {
  const bookInProgress: IBook[] = books.filter((book) => book.isRead === "IN_PROGRESS");

  return (
		<div className='bg-white shadow mt-6  rounded-lg p-6'>
			<h3 className='text-gray-600 text-sm font-semibold mb-4'>
				En cours de lecture
			</h3>
			<ul className='flex items-center space-x-2 overflow-y-scroll'>
				{!bookInProgress.length ? (
					<p>Vous n'avez pas de livres en cours de lecture.</p>
				) : (
					bookInProgress.map((book, index) => (
						<li className='flex flex-col items-left space-y-2 p-1 border rounded-md whitespace-nowrap' key={index}>
							<p>{book.title}</p>
							<span className='text-xs text-gray-500'>{book.author}</span>
						</li>
					))
				)}
			</ul>
		</div>
	);
}
