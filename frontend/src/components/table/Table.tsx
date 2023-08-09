import { useForm } from 'react-hook-form';
import Spinner from '../spinner/Spinner';
import TableBody from './TableBody';
import { IBook, SortKeys, SortOrder } from '../../app/types';
import { useAppSelector } from '../../app/store/configureStore';
import {
	useGetBooksQuery,
} from '../../app/store/api/booksApi';
import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useState,
} from 'react';
import { sortData } from './HandleSortTable';
import TableHead from './table_head/TableHead';
import {
	BaseQueryArg,
	BaseQueryFn,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';

interface Props {
	searchField: string;
	handleCheckBox: (e: ChangeEvent<HTMLInputElement>, value: IBook) => void;
	handleUpdate: (data: IBook) => void;
	updateFields: boolean;
	setUpdateFields: Dispatch<SetStateAction<boolean>>;
}

export default function Table({
	searchField,
	handleCheckBox,
	handleUpdate,
	updateFields,
	setUpdateFields,
}: Props) {
	const { user } = useAppSelector((state) => state.auth);
	const { register, handleSubmit } = useForm<IBook>();

	const { data: books = [], isLoading } =
		useGetBooksQuery<BaseQueryArg<BaseQueryFn>>();
	const userBooks: IBook = books.filter((book: IBook) => {
		return searchField
			? book.userId === user.id &&
					book.title.toLowerCase().includes(searchField.toLowerCase())
			: book.userId === user.id;
	});
	const [sortKey, setSortKey] = useState<SortKeys>('title');
	const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');

	const sortedData = useCallback(
		() =>
			sortData({
				tableData: userBooks,
				sortKey,
				reverse: sortOrder === 'desc',
			}),
		[userBooks, sortKey, sortOrder]
	);

	function changeSort(key: SortKeys) {
		setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn');
		setSortKey(key);
	}

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
					<TableHead
						changeSort={changeSort}
						sortOrder={sortOrder}
						sortKey={sortKey}
						updateFields={updateFields}
						setUpdateFields={setUpdateFields}
					/>
					{userBooks && (
						<TableBody
							books={sortedData()}
							handleCheckBox={handleCheckBox}
							updateFields={updateFields}
							register={register}
						/>
					)}
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
