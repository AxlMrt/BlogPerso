import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

export default function NavLogo() {
  return (
    <Link to="/" className="flex flex-shrink-0 items-center">
      <img src={logo} className="h-8 w-auto" alt="logo" />
    </Link>
  );
}
