import { Link } from 'react-router-dom';

export default function Logging() {
	return (
		<div className='flex items-center lg:order-2'>
			<Link
				to='/login'
				className='block py-2 pr-4 pl-3 text-gray-700 border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
			>
				Se connecter
			</Link>
			<Link
				to='/register'
				className=' text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
			>
				S'inscrire
			</Link>
		</div>
	);
}
