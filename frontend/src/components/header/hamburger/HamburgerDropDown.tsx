/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "../../../app/store/configureStore";
import HamburgerNavItems from "./HamburgerNavItems";
import { loggedNavigation, notLoggedNavigation } from "../navigation";

export default function HamburgerDropDown({ navBar }: { navBar: boolean }) {
	const { user } = useAppSelector((state) => state.auth);
  return (
		<div
			className={`${navBar ? 'block' : 'hidden'} sm:hidden`}
			id='mobile-menu'
		>
			{user ? (
				<HamburgerNavItems navigation={loggedNavigation} />
			) : (
				<HamburgerNavItems navigation={notLoggedNavigation} />
			)}
		</div>
	);
}
