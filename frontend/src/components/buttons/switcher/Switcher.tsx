import Svg from '../../svg/Svg';
import {
	useAppDispatch, useAppSelector,
} from '../../../app/store/configureStore';
import { toggleMode } from '../../../app/utils';



export default function Switcher() {
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector((state) => state.theme.darkMode);

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
			onClick={() => toggleMode(dispatch, darkMode)}
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
