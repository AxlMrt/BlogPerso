import { Link } from 'react-router-dom';
import logo from "../../../assets/logo-transparent-png.png";
import invertLogo from '../../../assets/invert-logo.png';
import { useAppSelector } from '../../../app/store/configureStore';

export default function NavLogo() {
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	return (
		<Link to='/' className='flex items-center'>
			{darkMode ? (
				<img src={invertLogo} className='h-12 sm:h-16' alt='logo' />
			) : (
				<img src={logo} className='h-12 sm:h-16' alt='logo' />
			)}
		</Link>
	);
}
