import { AppDispatch } from "../store/configureStore";
import { toggleTheme } from "../store/slices/themeSlice";

export const isDark = () =>
	(localStorage && localStorage.theme === 'dark') ||
	(!('theme' in localStorage) &&
		window.matchMedia('(prefers-color-scheme: dark)').matches);

export const getTheme = (isDark: boolean) => (isDark ? 'dark' : 'light');

export const toggleMode = (dispatch: AppDispatch, darkMode: boolean) => {
	localStorage.theme = getTheme(!darkMode);
	if (localStorage.theme === 'dark') {
		document.documentElement.classList.remove('light');
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
		document.documentElement.classList.add('light');
	}
	dispatch(toggleTheme(!darkMode));
};