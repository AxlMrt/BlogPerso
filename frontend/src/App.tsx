import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import { useAppDispatch, useAppSelector } from './app/store/configureStore';
import { useEffect, useState } from 'react';
import { toggleTheme } from './app/store/slices/themeSlice';
import { getTheme } from './app/utils';
import { useGetUserDetailsQuery } from './app/store/api/authApi';
import { setUser } from './app/store/slices/authSlice';
import AddBookModal from './components/modal/AddBookModal';

function App() {
	const { token } = useAppSelector((state) => state.auth);
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	const dispatch = useAppDispatch();
	const [navBar, setNavbar] = useState<boolean>(false);
	const [profileBar, setProfilebar] = useState<boolean>(false);
	const { data } = useGetUserDetailsQuery('userDetails', {
		pollingInterval: 900000, // 15mins
	});

	useEffect(() => {
		if (data) dispatch(setUser(data));
		dispatch(toggleTheme(darkMode));
		document.documentElement.classList.add(getTheme(darkMode));
	}, [darkMode, data, dispatch, token]);

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
			<AddBookModal />
		</main>
	);
}

export default App;
