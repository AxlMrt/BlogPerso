import { useEffect, useState } from 'react';
import './header.css';
import NavLogo from './navlogo/NavLogo';
import Navigation from './navigation/Navigation';
import NavHamburger from './navigation/NavHamburger';
import Logs from './logs/Logs';
import DarkMode from '../buttons/darkmode/DarkMode'

export default function Header() {
	const [scroll, setScroll] = useState<boolean>(false);
	const [navbar, setNavbar] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScroll(window.scrollY > 50);
		});
	}, []);

	return (
		<nav
			className={`bg-white shadow-md border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 sticky top-0 ${
				scroll ? 'scrolling' : undefined
			}`}
		>
			<div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl '>
				<NavLogo />
				<div className='flex items-center lg:order-2'>
					<Logs />
					<DarkMode />
					<NavHamburger navbar={navbar} setNavBar={setNavbar} />
				</div>
				<Navigation navbar={navbar} />
			</div>
		</nav>
	);
}
