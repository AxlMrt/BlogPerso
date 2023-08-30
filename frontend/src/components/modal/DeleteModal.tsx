/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteUserMutation } from '../../app/store/api/usersApi';
import { useDeleteBookMutation } from '../../app/store/api/booksApi';
import { IBook } from '../../app/types';
import { useAppSelector } from '../../app/store/configureStore';
import CloseModalButton from '../buttons/close_modal/CloseModalButton';
import { BsTrash } from 'react-icons/bs';

export default function DeleteModal() {
	const { user } = useAppSelector((state: { auth: any }) => state.auth);
	const [deleteUser] = useDeleteUserMutation();
	const [deleteBook] = useDeleteBookMutation();

	const closeModal = () => {
		(window as any).deleteModal.close();
	};

	const handleDelete = async () => {
		try {
			await user.books.map((book: IBook) => deleteBook({ bookId: book.id, id: user.id }));
			await deleteUser(user.id!).then(() => localStorage.clear());
		} catch (error) {
			console.log("Couldn't delete this user:", error);
		}
	};

	return (
		<dialog
			id='deleteModal'
			className='fixed z-50 w-full max-w-full p-4 overflow-x-hidden overflow-y-auto md:p-12 h-screen max-h-full justify-center items-center bg-white bg-opacity-50 dark:bg-gray-700 dark:bg-opacity-50'
			onClick={closeModal}
		>
			<div
				className='relative w-full max-w-md max-h-full m-auto'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
					<CloseModalButton close={closeModal} />
					<BsTrash
						size={30}
						className={
							'text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto'
						}
					/>
					<p className='mb-4 text-gray-500 dark:text-gray-300'>
						Êtes-vous sur de vouloir supprimer votre compte ?
					</p>
					<div className='flex justify-center items-center space-x-4'>
						<button
							type='button'
							className='py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
							onClick={closeModal}
						>
							Non, arrêter
						</button>
						<button
							type='submit'
							className='py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900'
							onClick={handleDelete}
						>
							Oui, supprimer
						</button>
					</div>
				</div>
			</div>
		</dialog>
	);
}
