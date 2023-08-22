import TableBody from './TableBody';
import { IBook } from '../../app/types';
import {
	ChangeEvent,
	Dispatch,
	FormEvent,
	MouseEvent,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import TableHead from './table_head/TableHead';
import { useUpdateBookMutation } from '../../app/store/api/booksApi';
import { useNavigate } from 'react-router-dom';
interface Props {
	books: IBook[];
	updateFields: boolean;
	field: string;
	order: string;
	type: string;
	tableHeadFilterVisible: boolean;
	setType: Dispatch<SetStateAction<string>>;
	setField: Dispatch<SetStateAction<string>>;
	setOrder: Dispatch<SetStateAction<string>>;
	setSearchField: Dispatch<SetStateAction<string>>;
	setTableHeadFilterVisible: Dispatch<SetStateAction<boolean>>;
	setUpdateFields: Dispatch<SetStateAction<boolean>>;
	handleCheckBox: (e: ChangeEvent<HTMLInputElement>, value: IBook) => void;
}

export default function Table({
	books,
	updateFields,
	field,
	order,
	type,
	setType,
	setField,
	setOrder,
	setSearchField,
	setUpdateFields,
	handleCheckBox,
	tableHeadFilterVisible,
	setTableHeadFilterVisible,
}: Props) {
	const [edit, setEdit] = useState<IBook[] | null>(null);
	const [updateBook] = useUpdateBookMutation();
	const navigate = useNavigate();

	function changeSort(e: MouseEvent, key: string): void {
		e.preventDefault();
		setOrder(order === 'asc' ? 'desc' : 'asc');
		setField(key);
	}

	const handleUpdate = async (e: FormEvent) => {
		e.preventDefault();
		edit!.forEach((book) => {
			try {
				updateBook(book).then(() => navigate(0));
			} catch (error) {
				console.error('Failed to update the book: ', error);
			}
		});
	};

	const onChangeInput = (e: ChangeEvent<HTMLElement>, bookId: string) => {
		const { name, value } = e.target as HTMLInputElement;
		//console.log('name', name);
		//console.log('value', value);
		//console.log('bookId', bookId);
		const editData = edit!.map((item) =>
			item.id === bookId && name ? { ...item, [name]: value } : item
		);
		//console.log('editData', editData);
		setEdit(editData);
	};

	useEffect(() => {
		setEdit(books);
	}, [books]);

	return (
		<div className='overflow-x-auto shadow-md rounded-sm sm:rounded-lg'>
			<form action='' id='table_form' onSubmit={handleUpdate}>
				<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<TableHead
						changeSort={changeSort}
						order={order}
						field={field}
						updateFields={updateFields}
						setUpdateFields={setUpdateFields}
						books={books}
						setSearchField={setSearchField}
						type={type}
						setType={setType}
						tableHeadFilterVisible={tableHeadFilterVisible}
						setTableHeadFilterVisible={setTableHeadFilterVisible}
					/>
					{books && (
						<TableBody
							books={books}
							onChangeInput={onChangeInput}
							handleCheckBox={handleCheckBox}
							updateFields={updateFields}
						/>
					)}
				</table>
			</form>

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
