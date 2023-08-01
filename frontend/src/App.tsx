import { Outlet } from 'react-router-dom';
import Header from "./components/header/Header";
import Modal from './components/modal/Modal';
import { useAppDispatch, useAppSelector } from './app/store/configureStore';
import { useEffect } from 'react';
import { toggleTheme } from './app/store/slices/themeSlice';
import { getTheme } from './app/utils';

function App() {
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector((state) => state.theme.darkMode);

	useEffect(() => {
		dispatch(toggleTheme(darkMode))
		document.documentElement.classList.add(getTheme(darkMode));
	}, [darkMode, dispatch]);

	return (
		<main className='bg-gray-50 dark:bg-gray-900 h-screen'>
			<Header />
			<Outlet />
			<Modal />
		</main>
	);
}

export default App;
