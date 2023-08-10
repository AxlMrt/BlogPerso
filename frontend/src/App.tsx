import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Modal from './components/modal/Modal';
import { useAppDispatch, useAppSelector } from './app/store/configureStore';
import { useEffect, useState } from 'react';
import { toggleTheme } from './app/store/slices/themeSlice';
import { getTheme } from './app/utils';

function App() {
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	const [navBar, setNavbar] = useState<boolean>(false);
	const [profileBar, setProfilebar] = useState<boolean>(false);

	useEffect(() => {
		dispatch(toggleTheme(darkMode));
		document.documentElement.classList.add(getTheme(darkMode));
	}, [darkMode, dispatch]);

	const handleClick = () => {
		setProfilebar(false);
		setNavbar(false);
	}

	return (
		<main
			className='bg-gray-100 dark:bg-gray-900 h-screen'
			onClick={handleClick}
		>
			<Header
				profileBar={profileBar}
				setProfilebar={setProfilebar}
				navBar={navBar}
				setNavBar={setNavbar}
			/>
			<Outlet />
			<Modal />
		</main>
	);
}

export default App;
