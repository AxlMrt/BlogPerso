import { useEffect } from 'react';
import Svg from '../../svg/Svg';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../app/store/configureStore';
import { toggleTheme } from '../../../app/store/slices/themeSlice';

const isDark = () =>
	//Function that will return boolean if any of the condition is satisfied
	(localStorage && localStorage.theme === 'dark') || //Condition 1 - has local storage and theme = dark in local storage is found
	(!('theme' in localStorage) &&
		window.matchMedia('(prefers-color-scheme: dark)').matches); //Condition 2 - No theme key in local storage but media color scheme is dark

const getTheme = (isDark: boolean) => (isDark ? 'dark' : 'light'); //Function to return 'dark' or 'light' string

export default function Switcher() {
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	const dispatch = useAppDispatch();

	const toggleMode = () => {
		//onClick handler for changing theme on button press
		localStorage.theme = getTheme(!darkMode); //setting up local storage theme value
		if (localStorage.theme === 'dark') {
			// If theme is 'dark'
			document.documentElement.classList.remove('light'); // remove 'light' from html class
			document.documentElement.classList.add('dark'); // add 'dark' to html class
		} else {
			// if not 'dark'
			document.documentElement.classList.remove('dark'); // remove 'dark' from html class
			document.documentElement.classList.add('light'); //add 'light' to html class
		}
		dispatch(toggleTheme(!darkMode)); //set dark mode state to opposite of initial value
	};

	useEffect(() => {
		dispatch(toggleTheme(isDark())); //before page mount set the value of dark mode by observing theme in local storage
	}, [dispatch]);

	// process.browser is deprecat
	const mode = {
		dark: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
		light:
			'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
		class: 'w-6 h-6',
		viewBox: '0 0 24 24',
	};

	return (
		<button
			onClick={toggleMode}
			className={`${
				!darkMode ? 'text-gray-500' : 'text-white'
			} shadow-none p-2 text-lg cursor-pointer`}
		>
			<Svg
				icon={!darkMode ? mode.dark : mode.light}
				iconClass={mode.class}
				viewBox={mode.viewBox}
			/>
		</button>
	);
}
