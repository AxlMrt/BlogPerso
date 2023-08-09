import { ChangeEvent, useState } from 'react';
import Search from '../components/table/Search';
import Table from '../components/table/Table';
import TableUpdate from '../components/table_update/TableUpdate';
import { IBook } from '../app/types';
import { useUpdateBookMutation } from '../app/store/api/booksApi';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
	const [searchField, setSearchField] = useState<string>('');
	const [bookToUpdate, setBookToUpdate] = useState<IBook[]>([]);
	const [updateFields, setUpdateFields] = useState<boolean>(false);

	const [updateBook] = useUpdateBookMutation();
	const navigate = useNavigate();

	const handleCheckBox = (e: ChangeEvent<HTMLInputElement>, value: IBook) => {
		e.target.checked && setBookToUpdate([...bookToUpdate, value]);
		!e.target.checked && setBookToUpdate(bookToUpdate.filter((book: IBook) => book !== value));
	};

	const handleUpdate = async (data: IBook) => {
		try {
			console.log(data)
			await updateBook(data).then(() => navigate(0));
		} catch (error) {
			console.error('Failed to update the book: ', error);
		}
	};

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className=' w-5/6 m-auto mt-32'>
				<Search setSearchField={setSearchField} />
				<TableUpdate
					bookToUpdate={bookToUpdate}
					updateFields={updateFields}
					/>
				<Table
					searchField={searchField}
					handleCheckBox={handleCheckBox}
					handleUpdate={handleUpdate}
					setUpdateFields={setUpdateFields}
					updateFields={updateFields}
				/>
			</div>
		</section>
	);
}
