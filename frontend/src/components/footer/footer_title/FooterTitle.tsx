import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

export default function FooterTitle() {
  return (
    <div className="mb-6 md:mb-0">
      <Link to="/" className="flex items-center">
        <img src={logo} className="h-8 mr-3" alt="FlowBite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          M-A Bibliothèque
        </span>
      </Link>
    </div>
  );
}
