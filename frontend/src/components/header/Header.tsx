import { useEffect, useState } from 'react';
import Hamburger from './hamburger/Hamburger';
import Navigation from './navigation/Navigation';
import Switcher from '../buttons/switcher/Switcher';
import HamburgerDropDown from './hamburger/HamburgerDropDown';
import Profile from './profile/Profile';
import './header.css';

export default function Header() {
	const [scroll, setScroll] = useState<boolean>(false);
	const [navBar, setNavbar] = useState<boolean>(false);
	const [profileBar, setProfilebar] = useState<boolean>(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScroll(window.scrollY > 50);
		});
	}, []);

	return (
		<nav className={`bg-white shadow-md border-gray-200 dark:bg-gray-800 sticky top-0 ${
				scroll ? 'scrolling' : undefined
			}`}>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-16 items-center justify-between'>
					<Hamburger navBar={navBar} setNavbar={setNavbar} />
					<Navigation />
					<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <Switcher />
            <Profile profileBar={profileBar} setProfilebar={setProfilebar} />
					</div>
				</div>
			</div>
			<HamburgerDropDown navBar={navBar} />
		</nav>
	);
}
