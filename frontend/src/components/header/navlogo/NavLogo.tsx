import { Link } from 'react-router-dom';

export default function NavLogo() {
	return (
		<Link to='/' className='flex items-center'>
			<span className='text-2xl font-medium text-primary-700'>
				M-A Bibliothèque
			</span>
		</Link>
	);
}
