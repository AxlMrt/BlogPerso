import { Outlet } from 'react-router-dom';
import Header from "./components/header/Header";
import Modal from './components/modal/Modal';
import { useAppDispatch, useAppSelector } from './app/store/configureStore';
import { useEffect, useState } from 'react';
import { toggleTheme } from './app/store/slices/themeSlice';
import { getTheme } from './app/utils';

function App() {
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	const [profileBar, setProfilebar] = useState<boolean>(false);


	useEffect(() => {
		dispatch(toggleTheme(darkMode))
		document.documentElement.classList.add(getTheme(darkMode));
	}, [darkMode, dispatch]);

	return (
		<main
			className='bg-gray-100 dark:bg-gray-900 h-screen'
			onClick={() => setProfilebar(false)}
		>
			<Header profileBar={profileBar} setProfilebar={setProfilebar} />
			<Outlet />
			<Modal />
		</main>
	);
}

export default App;
