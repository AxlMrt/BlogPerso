import { Dispatch, SetStateAction } from 'react';
import Svg from '../../svg/Svg';

export default function Hamburger({
	navBar,
	setNavbar,
}: {
	navBar: boolean;
	setNavbar: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
			<button
				type='button'
				className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
				aria-controls='mobile-menu'
				aria-expanded='false'
				onClick={() => setNavbar(!navBar)}
			>
				<span className='absolute -inset-0.5'></span>
				<span className='sr-only'>Open main menu</span>
				<Svg
					icon={'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'}
					iconClass={`${navBar ? 'hidden' : 'block'} h-6 w-6`}
					viewBox={'0 0 24 24'}
				/>
				<Svg
					icon={'M6 18L18 6M6 6l12 12'}
					iconClass={`${navBar ? 'block' : 'hidden'} h-6 w-6`}
					viewBox={'0 0 24 24'}
				/>
			</button>
		</div>
	);
}
