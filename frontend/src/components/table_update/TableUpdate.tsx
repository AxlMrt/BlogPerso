import { useNavigate } from 'react-router-dom';
import DeleteBtn from '../buttons/delete_btn/DeleteBtn';
import { useDeleteBookMutation } from '../../app/store/api/booksApi';
import { IBook } from '../../app/types';
import ValidBtn from '../buttons/valid_button/ValidBtn';
import { BsThreeDots } from 'react-icons/bs';
import FilterBooks from './FilterBooks';

interface Props {
	bookToUpdate: IBook[];
	updateFields: boolean;
	books: IBook[];
}

export default function TableUpdate({
	bookToUpdate,
	updateFields,
	books,
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

	return (
		<div className='flex p-4'>
			<div className='relative'>
				<BsThreeDots />
				<FilterBooks books={books} />
			</div>
			<div
				className={`${!updateFields && 'hidden'} flex items-center gap-4 px-10`}
			>
				<ValidBtn />
				<DeleteBtn handleDelete={handleDelete} />
			</div>
		</div>
	);
}
