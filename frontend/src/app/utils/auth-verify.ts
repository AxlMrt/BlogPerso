import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface Props {
  logOut: () => void;
  logIn: () => void;
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function AuthVerify ({ logIn, logOut }: Props) {
  const location = useLocation();
  const { user, token, refreshToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now())
        if (refreshToken)
          logIn();
        else
          logOut();
      else
        logIn();
    }

  }, [location, logIn, logOut, refreshToken, token, user]);

  return undefined;
}