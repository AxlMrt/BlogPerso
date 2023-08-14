import { useNavigate } from 'react-router-dom';
import DeleteBtn from '../buttons/delete_btn/DeleteBtn';
import { useDeleteBookMutation } from '../../app/store/api/booksApi';
import { IBook } from '../../app/types';
import ValidBtn from '../buttons/valid_button/ValidBtn';
import { BsThreeDots } from 'react-icons/bs';
import FilterBooks from './FilterBooks';
import { Dispatch, SetStateAction } from 'react';
import Pagination from '../pagination/Pagination';

interface Props {
	bookToUpdate: IBook[];
	updateFields: boolean;
	data: { books: IBook; total: number; page: string; total_pages: number };
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
	setType: Dispatch<SetStateAction<string>>;
	filtersVisible: boolean;
	setFiltersVisible: Dispatch<SetStateAction<boolean>>;
}

export default function TableUpdate({
	bookToUpdate,
	updateFields,
	data,
	page,
	setPage,
	setType,
	filtersVisible,
	setFiltersVisible
}: Props) {
	const [deleteBook] = useDeleteBookMutation();
	const navigate = useNavigate();

	const handleDelete = () => {
		bookToUpdate.forEach(async (book: IBook) => {
			try {
				await deleteBook(book.id).then(() => navigate(0));
			} catch (error) {
				console.error('Failed to delete the book: ', error);
			}
		});
	};
	
	const openFilters = (e: Event) => {
		e.stopPropagation();
		setFiltersVisible(true)
	}

	return (
		<div className='flex p-4 justify-between'>
			<div className='flex items-center'>
				<div className='relative'>
					<BsThreeDots
						className={'dark:text-white cursor-pointer'}
						onClick={openFilters}
					/>
					<FilterBooks filtersVisible={filtersVisible} setType={setType} />
				</div>
				<div
					className={`${
						!updateFields && 'hidden'
					} flex items-center gap-4 px-10 dark:text-white`}
				>
					<ValidBtn />
					<DeleteBtn handleDelete={handleDelete} />
				</div>
			</div>
			<Pagination data={data} page={page} setPage={setPage} />
		</div>
	);
}
