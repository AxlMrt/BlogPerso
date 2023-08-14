import { useNavigate } from 'react-router-dom';
import DeleteBtn from '../buttons/delete_btn/DeleteBtn';
import { useDeleteBookMutation } from '../../app/store/api/booksApi';
import { IBook } from '../../app/types';
import ValidBtn from '../buttons/valid_button/ValidBtn';
import { BsThreeDots } from 'react-icons/bs';
import FilterBooks from './FilterBooks';
import { Dispatch, SetStateAction, useState } from 'react';
import Pagination from '../pagination/Pagination';

interface Props {
	bookToUpdate: IBook[];
	updateFields: boolean;
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
}

export default function TableUpdate({
	bookToUpdate,
	updateFields,
	page,
	setPage,
}: Props) {
	const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
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

	return (
		<div className='flex p-4 justify-between'>
			<div>
				<div className='relative'>
					<BsThreeDots
						className={'dark:text-white cursor-pointer'}
						onClick={() => setFiltersVisible(!filtersVisible)}
					/>
					<FilterBooks filtersVisible={filtersVisible} />
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
			<Pagination
				page={page}
				setPage={setPage}
			/>
		</div>
	);
}
