/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { IBook } from '../../../app/types';
import ReadState from './ReadState';
import BookTitle from './BookTitle';
import BookAuthor from './BookAuthor';
import BookYear from './BookYear';
import BookButtons from './BookButtons';
import { UseFormRegister } from 'react-hook-form';
import { useDeleteBookMutation } from '../../../app/store/api/booksApi';

export default function SingleBook({
	book,
	register,
}: {
	book: IBook;
	register: UseFormRegister<IBook>;
}) {
	const [deleteBook] = useDeleteBookMutation();
	const [updating, setUpdating] = useState<boolean>(false);

	const handleDelete = async () => {
		try {
			await deleteBook(book.id).unwrap();
			window.location.reload();
		} catch (error) {
			console.error('Failed to delete the book: ', error);
		}
	};

	return (
		<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
			<BookYear year={book.year} updating={updating} register={register} />
			<BookTitle book={book} updating={updating} register={register} />
			<BookAuthor
				author={book.author}
				updating={updating}
				register={register}
			/>
			<ReadState isRead={book.isRead} updating={updating} register={register} />
			<BookButtons
				updating={updating}
				setUpdating={setUpdating}
				handleDelete={handleDelete}
			/>
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
