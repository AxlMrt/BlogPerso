import { useLocation } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../store/configureStore";
import { toggleTheme } from "../store/slices/themeSlice";
import { useEffect } from "react";

interface Props {
  darkModeSetter: () => void;
}

export const isDark = () =>
  (localStorage && localStorage.theme === "dark") ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);

export const getTheme = (isDark: boolean) => (isDark ? "dark" : "light");

export const toggleMode = (dispatch: AppDispatch, darkMode: boolean) => {
  localStorage.theme = getTheme(!darkMode);
  if (localStorage.theme === "dark") {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }
  dispatch(toggleTheme(!darkMode));
};

export default function DarkModeSetter({ darkModeSetter }: Props) {
  const location = useLocation();
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  useEffect(() => {
    darkModeSetter();
    document.documentElement.classList.add(getTheme(darkMode));
  }, [location, darkMode, darkModeSetter]);

  return undefined;
}
