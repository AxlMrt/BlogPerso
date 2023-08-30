import { Link } from "react-router-dom";

interface Props {
  resources: { dest: string; text: string }[];
}

export default function ResourcesLinks({ resources }: Props) {
  return (
    <ul className="text-gray-500 dark:text-gray-400 font-medium">
      {resources.map((resource, index) => {
        return (
          <li className="mb-4" key={index}>
            <Link to={resource.dest} className="hover:underline">
              {resource.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
