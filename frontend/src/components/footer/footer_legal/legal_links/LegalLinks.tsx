import { Link } from "react-router-dom";

interface Props {
  legal: { dest: string; text: string }[];
}

export default function LegalLinks({ legal }: Props) {
  return (
    <ul className="text-gray-500 dark:text-gray-400 font-medium">
      {legal.map((legal, index) => {
        return (
          <li className="mb-4" key={index}>
            <Link to={legal.dest} className="hover:underline">
              {legal.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
