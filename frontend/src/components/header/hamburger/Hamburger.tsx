import { Dispatch, SetStateAction } from 'react';
import { ImBook } from 'react-icons/im';
import { FaBookOpen } from 'react-icons/fa';

interface Props {
	navBar: boolean;
	setNavbar: Dispatch<SetStateAction<boolean>>;
}

export default function Hamburger({ navBar, setNavbar }: Props) {
	return (
		<div
			className='absolute inset-y-0 left-0 flex items-center sm:hidden'
			onClick={(e) => e.stopPropagation()}
		>
			<button
				type='button'
				className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400 dark:focus:ring-white dark:text-white dark:bg-gray-800'
				aria-controls='mobile-menu'
				aria-expanded='false'
				onClick={() => setNavbar(!navBar)}
			>
				<span className='absolute -inset-0.5'></span>
				<span className='sr-only'>Open main menu</span>
				<ImBook size={25} className={`${navBar ? 'hidden' : 'block'}`} />
				<FaBookOpen size={25} className={`${navBar ? 'block' : 'hidden'}`} />
			</button>
		</div>
	);
}
