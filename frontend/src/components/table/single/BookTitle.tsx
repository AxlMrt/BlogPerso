import { UseFormRegister } from 'react-hook-form';
import { IBook } from '../../../app/types';
import StarRating from '../starRating/StarRating';

interface Props {
	book: IBook;
	updating: boolean;
	register: UseFormRegister<IBook>;
}

export default function BookTitle({ book, updating, onChangeInput }: Props) {
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
							name='title'
							placeholder={book.title}
							className='bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1'
							form='table_form'
							onChange={(e) => onChangeInput(e, book.id)}
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
