import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Hamburger from "./hamburger/Hamburger";
import Navigation from "./navigation/Navigation";
import Switcher from "../buttons/switcher/Switcher";
import HamburgerDropDown from "./hamburger/HamburgerDropDown";
import Profile from "./profile/Profile";
import "./header.css";

interface Props {
  profileBar: boolean;
  setProfilebar: Dispatch<SetStateAction<boolean>>;
  navBar: boolean;
  setNavBar: Dispatch<SetStateAction<boolean>>;
}

export default function Header({
  profileBar,
  setProfilebar,
  navBar,
  setNavBar,
}: Props) {
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  return (
    <nav
      className={`z-10 bg-white shadow-md border-gray-200 dark:bg-gray-800 sticky top-0 ${
        scroll ? "scrolling" : undefined
      }`}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <Hamburger navBar={navBar} setNavbar={setNavBar} />
          <Navigation />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 md:gap-6">
            <Switcher />
            <Profile profileBar={profileBar} setProfilebar={setProfilebar} />
          </div>
        </div>
      </div>
      <HamburgerDropDown navBar={navBar} />
    </nav>
  );
}
