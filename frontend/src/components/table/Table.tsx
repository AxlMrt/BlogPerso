/* eslint-disable @typescript-eslint/no-explicit-any */
import TableBody from './TableBody';
import TableHead from './TableHead';
import { useForm } from 'react-hook-form';
import { IBook } from '../../app/types';
import {useGetBooksQuery, useUpdateBookMutation} from '../../app/store/api/booksApi';
import Spinner from '../spinner/Spinner';

export default function Table() {
	const [updateBook] = useUpdateBookMutation();
	const {
		data: books = [],
		isLoading
	} = useGetBooksQuery<any>();

	const { register, handleSubmit } = useForm<IBook>();

	const handleUpdate = async (data: IBook) => {
		try {
			await updateBook(data).unwrap();
			window.location.reload();
		} catch (error) {
			console.error('Failed to update the book: ', error);
		}
	};

	return (
		<div className='overflow-x-auto shadow-md sm:rounded-lg'>
			<form
				action=''
				id='table_form'
				onSubmit={handleSubmit(handleUpdate)}
			></form>
			{isLoading ? (
				<Spinner />
			) : (
				<table className='w-full text-sm  text-left text-gray-500 dark:text-gray-400'>
					<TableHead />
					{books && <TableBody books={books} register={register} />}
				</table>
			)}

			{!books.length && (
				<div className='text-center my-5 dark:text-white'>
					<h3>Liste vide !</h3>
					Commencez votre collection littéraire: Ajoutez des livres à votre
					bibliothèque
				</div>
			)}
		</div>
	);
}


