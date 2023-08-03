import { IBook, IsBookRead } from '../../../app/types';
import StarRating from '../starRating/StarRating';

export default function SingleBook({ book }: { book: IBook }) {
	const isRead: IsBookRead = {
		NOT_READ: {
			color: 'bg-red-500',
			text: 'Non lu',
		},
		IN_PROGRESS: {
			color: 'bg-orange-500',
			text: 'Non lu',
		},
		IS_READ: {
			color: 'bg-green-500',
			text: 'Non lu',
		},
	};
	return (
		<tr
			className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
		>
			<td className='w-4 p-4'>
				<div className='flex items-center'>
					<input
						id='checkbox-table-search-1'
						type='checkbox'
						className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
					/>
					<label htmlFor='checkbox-table-search-1' className='sr-only'>
						checkbox
					</label>
				</div>
			</td>
			<th
				scope='row'
				className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
			>
				<div className='pl-3'>
					<div className='text-base font-semibold'>{book.title}</div>
          <div className='font-normal text-gray-500'>
            <StarRating book={book} />
          </div>
				</div>
			</th>
			<td className='px-6 py-4'>{book.author}</td>
			<td className='px-6 py-4'>
				<div className='flex items-center'>
					<div
						className={`h-2.5 w-2.5 rounded-full ${
							isRead[book.isRead as keyof IsBookRead].color
						} mr-2`}
					></div>{' '}
					{isRead[book.isRead as keyof IsBookRead].text}
				</div>
			</td>
			<td className='px-6 py-4'>
				<a
					href='#'
					className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
				>
					Modifier
				</a>
			</td>
		</tr>
	);
}
