/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Spinner from '../spinner/Spinner';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { IBook } from '../../app/types';
import { useAppSelector } from '../../app/store/configureStore';
import {useGetBooksQuery, useUpdateBookMutation} from '../../app/store/api/booksApi';

export default function Table() {
	const { user } = useAppSelector((state) => state.auth);
	const [updateBook] = useUpdateBookMutation();
	const {
		data: books = [],
		isLoading
	} = useGetBooksQuery<any>();
	const userBooks = books.filter((book: IBook) => book.userId === user.id);
	const { register, handleSubmit } = useForm<IBook>();
	const navigate = useNavigate();

	const handleUpdate = async (data: IBook) => {
		try {
			await updateBook(data).then(() => navigate(0));
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
					{userBooks && <TableBody books={userBooks} register={register} />}
				</table>
			)}

			{!userBooks.length && (
				<div className='text-center my-5 dark:text-white'>
					<h3>Liste vide !</h3>
					Commencez votre collection littéraire: Ajoutez des livres à votre
					bibliothèque
				</div>
			)}
		</div>
	);
}


