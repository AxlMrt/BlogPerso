import { Link } from "react-router-dom";

interface Props {
  socialMedia: { dest: string; text: string }[];
}

export default function FollowUsLinks({ socialMedia }: Props) {
  return (
    <ul className="text-gray-500 dark:text-gray-400 font-medium">
      {socialMedia.map((social, index) => {
        return (
          <li className="mb-4" key={index}>
            <Link to={social["dest"]} className="hover:underline ">
              {social["text"]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
