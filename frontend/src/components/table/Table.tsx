import { useEffect } from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchAllBooksAsync, updateBookAsync } from '../../app/store/actions/bookActions';
import { booksSelectors } from '../../app/store/slices/bookSlice';
import { useForm } from 'react-hook-form';
import { IBook } from '../../app/types';

export default function Table() {
	const { success } = useAppSelector((state) => state.book);
	const books = useAppSelector(booksSelectors.selectAll);
	const dispatch = useAppDispatch();

	const { register, handleSubmit } = useForm<IBook>();

	const handleUpdate = (data: IBook) => {
		dispatch(updateBookAsync(data));
		window.location.reload();
	};

	useEffect(() => {
		if (!success) dispatch(fetchAllBooksAsync());
	}, [success, dispatch]);

	return (
		<div className='overflow-x-auto shadow-md sm:rounded-lg'>
			<form
				action=''
				id='table_form'
				onSubmit={handleSubmit(handleUpdate)}
			></form>
			<table className='w-full text-sm  text-left text-gray-500 dark:text-gray-400'>
				<TableHead />
				{books.length > 0 && <TableBody books={books} register={register} />}
			</table>
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
