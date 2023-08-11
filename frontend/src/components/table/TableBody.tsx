import { ChangeEvent } from 'react';
import { IBook } from '../../app/types';
import SingleBook from './single/SingleBook';

interface Props {
	books: IBook[];
	onChangeInput: (e: ChangeEvent<HTMLElement>, bookId: string) => void;
	handleCheckBox: (e: ChangeEvent<HTMLInputElement>, value: IBook) => void;
	updateFields: boolean;
}

export default function TableBody({ books, onChangeInput, handleCheckBox, updateFields }: Props) {
	return (
		<tbody>
			{books.map((book: IBook, index: number) => (
				<SingleBook
					book={book}
					onChangeInput={onChangeInput}
					handleCheckBox={handleCheckBox}
					updateFields={updateFields}
					key={index}
				/>
			))}
		</tbody>
	);
}
