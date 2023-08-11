import TableBody from './TableBody';
import { IBook, SortKeys, SortOrder } from '../../app/types';
import {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { sortData } from './HandleSortTable';
import TableHead from './table_head/TableHead';
import { useUpdateBookMutation } from '../../app/store/api/booksApi';
import { useNavigate } from 'react-router-dom';
interface Props {
	searchField: string;
	handleCheckBox: (e: ChangeEvent<HTMLInputElement>, value: IBook) => void;
	updateFields: boolean;
	setUpdateFields: Dispatch<SetStateAction<boolean>>;
	books: IBook[];
}

export default function Table({
	searchField,
	handleCheckBox,
	updateFields,
	setUpdateFields,
	books,
}: Props) {
	const [edit, setEdit] = useState<IBook[] | null>(null);
	const [sortKey, setSortKey] = useState<SortKeys>('title');
	const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');
	const [updateBook] = useUpdateBookMutation();
	const navigate = useNavigate();
	const userBooks: IBook[] = books.filter((book: IBook) =>
		book.title.toLowerCase().includes(searchField.toLowerCase())
	);

	const sortedData = useCallback(
		() =>
			sortData({
				tableData: userBooks,
				sortKey,
				reverse: sortOrder === 'desc',
			}),
		[userBooks, sortKey, sortOrder]
	);

	function changeSort(key: SortKeys): void {
		setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn');
		setSortKey(key);
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
		<div className='overflow-x-auto shadow-md sm:rounded-lg'>
			<form action='' id='table_form' onSubmit={handleUpdate}>
				<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<TableHead
						changeSort={changeSort}
						sortOrder={sortOrder}
						sortKey={sortKey}
						updateFields={updateFields}
						setUpdateFields={setUpdateFields}
						books={userBooks}
					/>
					{userBooks && (
						<TableBody
							books={sortedData()}
							onChangeInput={onChangeInput}
							handleCheckBox={handleCheckBox}
							updateFields={updateFields}
						/>
					)}
				</table>
			</form>

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
