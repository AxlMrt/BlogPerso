import StarRating from '../starRating/StarRating';
import { IBook } from '../../../app/types';

export default function BookTitle({
	book,
	updating,
	register,
}: {
	book: IBook;
	updating: boolean;
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
