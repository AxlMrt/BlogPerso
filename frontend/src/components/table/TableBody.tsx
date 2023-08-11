import { UseFormRegister } from 'react-hook-form';
import { IBook } from '../../app/types';
import SingleBook from './single/SingleBook';
import { ChangeEvent } from 'react';

interface Props {
	books: IBook[];
	register: UseFormRegister<IBook>;
	handleCheckBox: (e: ChangeEvent<HTMLInputElement>, value: IBook) => void;
	updateFields: boolean;
}

export default function TableBody({ books, onChangeInput, register, handleCheckBox, updateFields }: Props) {
	return (
		<tbody>
			{books.map((book: IBook, index: number) => (
				<SingleBook
					book={book}
					onChangeInput={onChangeInput}
					register={register}
					handleCheckBox={handleCheckBox}
					updateFields={updateFields}
					key={index}
				/>
			))}
		</tbody>
	);
}
