import { Link } from "react-router-dom";

export default function AllRights() {
  return (
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
      © 2023{" "}
      <Link to="/" className="hover:underline">
        M-A Bibliothèque™
      </Link>
      . All Rights Reserved.
    </span>
  );
}
