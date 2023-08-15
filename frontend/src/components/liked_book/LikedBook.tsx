import { IBook } from '../../app/types';

interface Props {
	books: IBook[];
}

export default function LikedBook({ books }: Props) {
	const bookInProgress: IBook[] = books.filter((book) => book.feedBack > 4);

	return (
		<div className='bg-white dark:bg-gray-800 shadow mt-6  rounded-lg p-6'>
			<h3 className='text-gray-600 dark:text-white text-sm font-semibold mb-4'>
				Vos livres préférés
			</h3>
			<ul className='flex items-center space-x-2 overflow-y-scroll'>
				{!bookInProgress.length ? (
					<p className='dark:text-gray-300'>
						Aucun livre n'a obtenu le maximum d'étoiles..
					</p>
				) : (
					bookInProgress.map((book, index) => (
						<li
							className=' whitespace-nowrap max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
							key={index}
						>
							<h6 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
								{book.title}
							</h6>
							<span className='font-normal text-gray-700 dark:text-gray-400'>
								{[...Array(5)].map((_star, index) => {
									return (
											<span className='text-yellow-500' key={index}>&#9733;</span>
									);
								})}
							</span>
						</li>
					))
				)}
			</ul>
		</div>
	);
}
