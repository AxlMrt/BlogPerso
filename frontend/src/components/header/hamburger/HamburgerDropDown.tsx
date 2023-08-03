/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/store/configureStore";

export default function HamburgerDropDown({ navBar }: { navBar: boolean }) {
	const { userInfo } = useAppSelector((state) => state.auth);
  return (
		<div
			className={`${navBar ? 'block' : 'hidden'} sm:hidden`}
			id='mobile-menu'
		>
			{userInfo ? (
				<div className='space-y-1 px-2 pb-3 pt-2'>
					<Link
						to='#'
						className='bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
						aria-current='page'
						onClick={() => (window as any).add_book.showModal()}
					>
						Ajouter
					</Link>
					<Link
						to='#'
						className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
					>
						Accueil
					</Link>
					<Link
						to='#'
						className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
					>
						Bibliothèque
					</Link>
				</div>
			) : (
				<div className='space-y-1 px-2 pb-3 pt-2'>
					<Link
						to='/register'
						className='bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
						aria-current='page'
					>
						S'inscrire
					</Link>
					<Link
						to='/login'
						className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
					>
						Connexion
					</Link>
				</div>
			)}
		</div>
	);
}
