/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useState } from 'react';
import BookYear from './BookYear';
import ReadState from './ReadState';
import BookTitle from './BookTitle';
import BookAuthor from './BookAuthor';
import BookType from './BookType';
import { IBook } from '../../../app/types';
import BookCheckBox from './BookCheckBox';

interface Props {
	book: IBook;
	onChangeInput: (e: ChangeEvent<HTMLElement>, bookId: string) => void;
	handleCheckBox: (e: ChangeEvent<HTMLInputElement>, value: IBook) => void;
	updateFields: boolean;
}

export default function SingleBook({ book, onChangeInput, handleCheckBox, updateFields }: Props) {
	const [updating, setUpdating] = useState<boolean>(false);

	const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
		handleCheckBox(e, book);
		updateFields && setUpdating(!updating);
	};

	return (
		<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
			<BookCheckBox handleUpdate={handleUpdate} updateFields={updateFields} />

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
