import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/header/Header';
import { useAppDispatch, useAppSelector } from './app/store/configureStore';
import { useEffect, useState } from 'react';
import { toggleTheme } from './app/store/slices/themeSlice';
import { getTheme } from './app/utils';
import { setUser } from './app/store/slices/authSlice';
import AddBookModal from './components/modal/AddBookModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import agent from './app/axios/agent';

function App() {
	const { token } = useAppSelector((state) => state.auth);
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [navBar, setNavbar] = useState<boolean>(false);
	const [profileBar, setProfilebar] = useState<boolean>(false);

	useEffect(() => {
		agent.Auth.getUserDetails().then((res) => dispatch(setUser(res)));
	
		dispatch(toggleTheme(darkMode));
		document.documentElement.classList.add(getTheme(darkMode));
	}, [darkMode, dispatch, navigate, token]);

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
			<AddBookModal />
			<Outlet />
			<ToastContainer position='bottom-right' hideProgressBar theme='colored' />
		</main>
	);
}

export default App;
