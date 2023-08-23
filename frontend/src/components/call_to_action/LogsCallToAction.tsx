import { LuLogIn } from 'react-icons/lu';
import { Link } from 'react-router-dom';

export default function LogsCallToAction() {
  return (
		<div className='flex flex-col items-center justify-center space-y-3 sm:space-x-4 sm:space-y-0 sm:flex-row lg:justify-start'>
			<Link
				to='/register'
				className='px-8 py-4 text-lg font-medium text-center text-white bg-primary-600 hover:bg-primary-800 rounded-md '
			>
				S'inscrire
			</Link>
			<Link
				to='/login'
				className='flex items-center space-x-2 text-gray-500 dark:text-gray-400'
			>
				<LuLogIn />
				<span>Connexion</span>
			</Link>
		</div>
	);
}
