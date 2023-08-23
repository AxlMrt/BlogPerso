import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface Props {
  logOut: () => void
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function AuthVerify ({ logOut }: Props) {
  const location = useLocation();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const decodedJwt = parseJwt(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  }, [location, logOut, token]);

  return undefined;
}