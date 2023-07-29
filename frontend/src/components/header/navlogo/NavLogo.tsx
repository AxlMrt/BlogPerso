import { Link } from 'react-router-dom';
import logo from "../../../assets/logo-transparent-png.png";

export default function NavLogo() {
	return (
		<Link to='/' className='flex items-center'>
			<img src={logo} className='h-12 sm:h-16' alt='logo' />
		</Link>
	);
}
