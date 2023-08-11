import { UseFormRegister } from 'react-hook-form';
import { IBook } from '../../../app/types';
interface Props {
	book: IBook;
	updating: boolean;
	register: UseFormRegister<IBook>;
}

export default function BookType({ book, updating, onChangeInput }: Props) {
	return (
		<td className='px-6 py-4'>
			{updating ? (
				<input
					type='text'
					name='type'
					className='bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1'
					placeholder={book.type}
					form='table_form'
					onChange={(e) => onChangeInput(e, book.id)}
				/>
			) : book.type ? (
				book.type
			) : null}
		</td>
	);
}
