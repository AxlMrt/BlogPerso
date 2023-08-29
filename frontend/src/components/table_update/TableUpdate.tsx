import DeleteBtn from '../buttons/delete_btn/DeleteBtn';
import { useDeleteBookMutation } from '../../app/store/api/booksApi';
import { IBook } from '../../app/types';
import ValidBtn from '../buttons/valid_button/ValidBtn';
import { Dispatch, SetStateAction, useEffect } from 'react';
import Pagination from '../pagination/Pagination';
import { useAppSelector } from '../../app/store/configureStore';

interface Props {
	bookToUpdate: IBook[];
	updateFields: boolean;
	data: { books: IBook; total: number; page: string; total_pages: number };
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
	refetch: () => void;
}

export default function TableUpdate({
	bookToUpdate,
	updateFields,
	data,
	page,
	setPage,
	refetch,
}: Props) {
	const { user } = useAppSelector((state) => state.auth);
	const [deleteBook, { isSuccess }] = useDeleteBookMutation();

	const handleDelete = () => {
		bookToUpdate.forEach(async (book: IBook) => {
			const data = { bookId: book.id, id: user!['id'] };

			console.log(data)
			try {
				await deleteBook(data);
			} catch (error) {
				console.error('Failed to delete the book: ', error);
			}
		});
	};

	useEffect(() => {
		if (isSuccess) refetch();
	}, [isSuccess, refetch]);

	return (
		<div className='flex p-4 justify-between'>
			<div className='flex items-center'>
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
