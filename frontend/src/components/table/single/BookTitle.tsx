import StarRating from '../starRating/StarRating';
import { IBook } from '../../../app/types';
import { UseFormRegister } from 'react-hook-form';

export default function BookTitle({
	book,
	updating,
	register,
}: {
	book: IBook;
	updating: boolean;
	register: UseFormRegister<IBook>;
}) {
	return (
		<th
			scope='row'
			className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
		>
			<div className='pl-3'>
				<div className='text-base font-semibold'>
					{updating ? (
						<input
							type='text'
							placeholder={book.title}
							className='bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1'
							form='table_form'
							{...register('title', {
								setValueAs: (x: string) => (x ? x : book.title),
							})}
						/>
					) : (
						book.title
					)}
				</div>
				<div className='font-normal text-gray-500'>
					<StarRating book={book} />
				</div>
			</div>
		</th>
	);
}