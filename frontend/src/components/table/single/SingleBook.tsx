/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseFormRegister } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import BookYear from './BookYear';
import ReadState from './ReadState';
import BookTitle from './BookTitle';
import BookAuthor from './BookAuthor';
import BookType from './BookType';
import { IBook } from '../../../app/types';

interface Props {
	book: IBook;
	register: UseFormRegister<IBook>;
	handleCheckBox: (e: ChangeEvent<HTMLInputElement>, value: IBook) => void;
	updateFields: boolean;
}

export default function SingleBook({ book, register, handleCheckBox, updateFields }: Props) {
	const [updating, setUpdating] = useState<boolean>(false);

	const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
		handleCheckBox(e, book);
		updateFields && setUpdating(!updating);
	};

	return (
		<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
			<td className='w-4 p-4'>
				<div className='flex items-center'>
					<input
						id='checkbox-table-search-1'
						type='checkbox'
						className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						onChange={(e) => handleUpdate(e)}
						disabled={!updateFields}
					/>
					<label htmlFor='checkbox-table-search-1' className='sr-only'>
						checkbox
					</label>
				</div>
			</td>
			<BookYear year={book.year} updating={updating} register={register} />
			<BookTitle book={book} updating={updating} register={register} />
			<BookAuthor
				author={book.author}
				updating={updating}
				register={register}
			/>
			<ReadState isRead={book.isRead} updating={updating} register={register} />
			<BookType type={book.type} updating={updating} register={register} />
			<td className='hidden'>
				<input
					type='text'
					{...register('id', {
						setValueAs: (x: string) => (x ? book.id : book.id),
					})}
				/>
			</td>
		</tr>
	);
}
