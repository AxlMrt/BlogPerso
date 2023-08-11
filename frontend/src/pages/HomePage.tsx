import { ChangeEvent, useState } from 'react';
import Search from '../components/table/Search';
import Table from '../components/table/Table';
import TableUpdate from '../components/table_update/TableUpdate';
import { IBook } from '../app/types';
import { useGetBooksQuery, useUpdateBookMutation } from '../app/store/api/booksApi';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { BaseQueryArg } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { useAppSelector } from '../app/store/configureStore';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
	const { user } = useAppSelector((state) => state.auth);
	const [searchField, setSearchField] = useState<string>('');
	const [bookToUpdate, setBookToUpdate] = useState<IBook[]>([]);
	const [updateFields, setUpdateFields] = useState<boolean>(false);


	const { data: books = [], isLoading } = useGetBooksQuery<BaseQueryArg<BaseQueryFn>>();
	const userBooks = books.filter((book: IBook) => book.userId === user.id);

	const handleCheckBox = (e: ChangeEvent<HTMLInputElement>, value: IBook) => {
		setBookToUpdate([...bookToUpdate, value]);
		!e.target.checked && setBookToUpdate(bookToUpdate.filter((book: IBook) => book.id !== value.id));
	};

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className=' w-5/6 m-auto mt-32'>
				<Search setSearchField={setSearchField} />
				<TableUpdate
					bookToUpdate={bookToUpdate}
					updateFields={updateFields}
					books={userBooks}
				/>
				<Table
					searchField={searchField}
					handleCheckBox={handleCheckBox}
					setUpdateFields={setUpdateFields}
					updateFields={updateFields}
					books={userBooks}
					isLoading={isLoading}
				/>
			</div>
		</section>
	);
}
