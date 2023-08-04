import { AppDispatch } from "./store/configureStore";
import { toggleTheme } from "./store/slices/themeSlice";

export const isDark = () =>
	//Function that will return boolean if any of the condition is satisfied
	(localStorage && localStorage.theme === 'dark') || //Condition 1 - has local storage and theme = dark in local storage is found
	(!('theme' in localStorage) &&
		window.matchMedia('(prefers-color-scheme: dark)').matches); //Condition 2 - No theme key in local storage but media color scheme is dark

export const getTheme = (isDark: boolean) => (isDark ? 'dark' : 'light'); //Function to return 'dark' or 'light' string

export const toggleMode = (dispatch: AppDispatch, darkMode: boolean) => {
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

export const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));