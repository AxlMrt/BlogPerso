import { ChangeEvent, useState } from 'react';
import Search from '../components/table/Search';
import Table from '../components/table/Table';
import TableUpdate from '../components/table_update/TableUpdate';
import { IBook } from '../app/types';
import { useAppSelector } from '../app/store/configureStore';
import { useGetUserBookQuery } from '../app/store/api/userQueryApi';
import Spinner from '../components/spinner/Spinner';
import {
	BaseQueryArg,
	BaseQueryFn,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export default function HomePage() {
	const [page, setPage] = useState<number>(1);

	const { user } = useAppSelector((state) => state.auth);
	const { data, isLoading} = useGetUserBookQuery<BaseQueryArg<BaseQueryFn>>({ id: user.id, page});

	const [searchField, setSearchField] = useState<string>('');
	const [bookToUpdate, setBookToUpdate] = useState<IBook[]>([]);
	const [updateFields, setUpdateFields] = useState<boolean>(false);

	const handleCheckBox = (e: ChangeEvent<HTMLInputElement>, value: IBook) => {
		setBookToUpdate([...bookToUpdate, value]);
		!e.target.checked &&
			setBookToUpdate(
				bookToUpdate.filter((book: IBook) => book.id !== value.id)
			);
	};

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			{isLoading ? (
				<Spinner />
			) : (
				<div className=' w-5/6 m-auto mt-32'>
					<Search setSearchField={setSearchField} />
					<TableUpdate
						bookToUpdate={bookToUpdate}
						updateFields={updateFields}
						page={page}
						setPage={setPage}
					/>
					<Table
						searchField={searchField}
						handleCheckBox={handleCheckBox}
						setUpdateFields={setUpdateFields}
						updateFields={updateFields}
						books={data.books}
					/>
				</div>
			)}
		</section>
	);
}
