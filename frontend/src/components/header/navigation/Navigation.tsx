/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "../../../app/store/configureStore";
import NavLogo from "../logo/NavLogo";
import { loggedNavigation, notLoggedNavigation } from "../../../app/navigation";
import NavItems from "./NavItems";

export default function Navigation() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
      <NavLogo />
      {user ? (
        <NavItems navigation={loggedNavigation} />
      ) : (
        <NavItems navigation={notLoggedNavigation} />
      )}
    </div>
  );
}
