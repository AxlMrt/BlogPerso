/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/configureStore';
import NavLogo from '../navlogo/NavLogo';


export default function Navigation() {
	const { userInfo } = useAppSelector((state) => state.auth);

	return (
		<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
			<NavLogo />
			{userInfo ? (
				<div className='hidden sm:ml-6 sm:block text-gray-600 '>
					<div className='flex space-x-4'>
						<Link
							to='#'
							className='bg-gray-300 text-black  rounded-md px-3 py-2 text-sm font-medium dark:bg-gray-900 dark:text-gray-300 dark:hover:text-white'
							aria-current='page'
							onClick={() => (window as any).add_book.showModal()}
						>
							Ajouter
						</Link>
						<Link
							to='#'
							className='hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-sm font-medium dark:hover:text-white dark:hover:bg-gray-700'
						>
							Accueil
						</Link>
						<Link
							to='#'
							className='hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-sm font-medium dark:hover:text-white dark:hover:bg-gray-700 '
						>
							Bibliothèque
						</Link>
					</div>
				</div>
			) : (
				<div className='hidden sm:ml-6 sm:block text-gray-600 '>
					<div className='flex space-x-4'>
						<Link
							to='/register'
							className='bg-gray-300 text-black  rounded-md px-3 py-2 text-sm font-medium dark:bg-gray-900 dark:text-gray-300 dark:hover:text-white'
							aria-current='page'
						>
							S'incrire
						</Link>
						<Link
							to='/login'
							className='hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-sm font-medium dark:hover:text-white dark:hover:bg-gray-700 '
						>
							Connexion
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
