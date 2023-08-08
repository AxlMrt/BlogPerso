import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/store/configureStore";
import { logout } from "../../../app/store/slices/authSlice";
import { Dispatch, SetStateAction } from "react";

export default function ProfileDropDown({
	profileBar,
	setProfilebar,
}: {
	profileBar: boolean;
	setProfilebar: Dispatch<SetStateAction<boolean>>;
}) {
	const dispatch = useAppDispatch();
	const disconnect = () => {
		setProfilebar(false);
		dispatch(logout());
	};

	return (
		<div
			className={`${
				profileBar ? 'block' : 'hidden'
			} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
		>
			<Link
				to='/account'
				className='block px-4 py-2 text-sm text-gray-700'
			>
				Profil
			</Link>
			<Link
				to='#'
				className='block px-4 py-2 text-sm text-gray-700'
			>
				Paramètres
			</Link>
			<Link
				to='/'
				className='block px-4 py-2 text-sm text-gray-700'
				onClick={disconnect}
			>
				Déconnexion
			</Link>
		</div>
	);
}
