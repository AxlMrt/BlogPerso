import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/store/configureStore";
import { logout } from "../../../app/store/slices/authSlice";

export default function ProfileDropDown({ profileBar }: { profileBar: boolean }) {
  const dispatch = useAppDispatch();
  const disconnect = () => {
		dispatch(logout());
  };

  return (
		<div
			className={`${
				profileBar ? 'block' : 'hidden'
			} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
			role='menu'
			aria-orientation='vertical'
			aria-labelledby='user-menu-button'
		>
			<Link
				to='#'
				className='block px-4 py-2 text-sm text-gray-700'
				role='menuitem'
				id='user-menu-item-0'
			>
				Profil
			</Link>
			<Link
				to='#'
				className='block px-4 py-2 text-sm text-gray-700'
				role='menuitem'
				id='user-menu-item-1'
			>
				Paramètres
			</Link>
			<Link
				to='/'
				className='block px-4 py-2 text-sm text-gray-700'
				role='menuitem'
        id='user-menu-item-2'
        onClick={disconnect}
			>
				Déconnexion
			</Link>
		</div>
	);
}
