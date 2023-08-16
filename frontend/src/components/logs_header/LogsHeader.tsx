import { Link } from 'react-router-dom';

export default function LogsHeader() {
  return (
		<Link
			to='/'
			className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
		>
			M-A Bibliotheque
		</Link>
	);
}
