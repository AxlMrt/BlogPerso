import { IBook } from '../../app/types';

interface Props {
	books: IBook[];
}

export default function ReadingProgress({ books }: Props) {
	const bookInProgress: IBook[] = books.filter(
		(book) => book.isRead === 'IN_PROGRESS'
	);

	return (
		<div className='bg-white dark:bg-gray-800 shadow mt-6  rounded-lg p-6'>
			<h3 className='text-gray-600 dark:text-white text-sm font-semibold mb-4'>
				En cours de lecture
			</h3>
			<ul className='flex items-center space-x-2 py-2 overflow-y-scroll'>
				{!bookInProgress.length ? (
					<p className='dark:text-gray-300'>
						Vous n'avez pas de livres en cours de lecture.
					</p>
				) : (
					bookInProgress.map((book, index) => (
						<li
							className=' whitespace-nowrap max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
							key={index}
						>
							<h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
								{book.title}
							</h6>
							<span className='text-sm text-gray-700 dark:text-gray-400'>
								{book.author}
							</span>
						</li>
					))
				)}
			</ul>
		</div>
	);
}
