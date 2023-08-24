import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import { useAppDispatch, useAppSelector } from './app/store/configureStore';
import { useCallback, useState } from 'react';
import { toggleTheme } from './app/store/slices/themeSlice';
import DarkModeSetter from './app/utils/darkMode';
import { logout, setUser } from './app/store/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import agent from './app/axios/agent';
import AuthVerify from './app/utils/auth-verify';

function App() {
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	const dispatch = useAppDispatch();
	const [navBar, setNavbar] = useState<boolean>(false);
	const [profileBar, setProfilebar] = useState<boolean>(false);

	const handleClick = () => {
		setProfilebar(false);
		setNavbar(false);
	};

	const darkModeSetter = useCallback(() => {
		dispatch(toggleTheme(darkMode));
	}, [darkMode, dispatch]);

	const logIn = useCallback(() => {
		agent.Auth.getUserDetails().then((res) => dispatch(setUser(res)));
	}, [dispatch]);

	const logOut = useCallback(() => {
		dispatch(logout());
		toast.error('Vous avez été déconnecté.')
	}, [dispatch]);

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
			<AuthVerify logIn={logIn} logOut={logOut} />
			<DarkModeSetter darkModeSetter={darkModeSetter} />
			<Outlet />
			<ToastContainer position='bottom-right' hideProgressBar theme='colored' />
		</main>
	);
}

export default App;
