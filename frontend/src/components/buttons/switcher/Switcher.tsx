import { RiSunFoggyLine, RiMoonClearFill } from 'react-icons/ri';

import {
	useAppDispatch,
	useAppSelector,
} from '../../../app/store/configureStore';
import { toggleMode } from '../../../app/utils/darkMode';

export default function Switcher() {
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	return (
		<button onClick={() => toggleMode(dispatch, darkMode)}>
			{darkMode ? (
				<RiMoonClearFill className={'text-white bg'} size={25} />
			) : (
				<RiSunFoggyLine className={'text-gray-500'} size={25} />
			)}
		</button>
	);
}
