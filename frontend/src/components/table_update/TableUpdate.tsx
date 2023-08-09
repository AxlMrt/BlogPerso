import { useNavigate } from 'react-router-dom';
import DeleteBtn from '../buttons/delete_btn/DeleteBtn';
import { useDeleteBookMutation } from '../../app/store/api/booksApi';
import { IBook } from '../../app/types';
import ValidBtn from '../buttons/valid_button/ValidBtn';

interface Props {
	bookToUpdate: IBook[];
	updateFields: boolean;
}

export default function TableUpdate({ bookToUpdate, updateFields }: Props) {
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
		<div className={`${!updateFields && 'hidden'} flex items-center gap-2`}>
			<ValidBtn />
			<DeleteBtn handleDelete={handleDelete} />
		</div>
	);
}
