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

export default function SingleBook({ book, onChangeInput, register, handleCheckBox, updateFields }: Props) {
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
						onChange={handleUpdate}
						disabled={!updateFields}
					/>
					<label htmlFor='checkbox-table-search-1' className='sr-only'>
						checkbox
					</label>
				</div>
			</td>

			<BookYear book={book} updating={updating} onChangeInput={onChangeInput} />
			<BookTitle
				book={book}
				updating={updating}
				onChangeInput={onChangeInput}
			/>
			<BookAuthor
				book={book}
				updating={updating}
				onChangeInput={onChangeInput}
			/>
			<ReadState
				book={book}
				updating={updating}
				onChangeInput={onChangeInput}
			/>
			<BookType book={book} updating={updating} onChangeInput={onChangeInput} />
		</tr>
	);
}
