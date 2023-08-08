/* eslint-disable @typescript-eslint/no-explicit-any */
import Svg from '../svg/Svg';
import { useDeleteUserMutation } from '../../app/store/api/usersApi';
import { useDeleteBookMutation } from '../../app/store/api/booksApi';
import { IBook } from '../../app/types';
import { useAppSelector } from '../../app/store/configureStore';

export default function DeleteModal() {
	const { user } = useAppSelector((state) => state.auth);
  const [deleteUser] = useDeleteUserMutation();
  const [deleteBook] = useDeleteBookMutation();

	const closeIcon = {
		icon: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
		class: 'w-5 h-5',
		viewBox: '0 0 20 20',
	};

	const closeModal = () => {
		(window as any).deleteModal.close();
  };
  
	const handleDelete = async () => {
		try {
			await user.books.map((book: IBook) => deleteBook(book.id));
			await deleteUser(user.id).then(() => localStorage.clear());
    } catch (error) {
      console.log("Couldn't delete this user:", error)
    }
  }

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
					<button
						type='button'
						className='text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
						onClick={closeModal}
					>
						<Svg
							icon={closeIcon.icon}
							iconClass={closeIcon.class}
							viewBox={closeIcon.viewBox}
						/>
						<span className='sr-only'>Close modal</span>
					</button>
					<svg
						className='text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto'
						aria-hidden='true'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fillRule='evenodd'
							d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
							clipRule='evenodd'
						></path>
					</svg>
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
