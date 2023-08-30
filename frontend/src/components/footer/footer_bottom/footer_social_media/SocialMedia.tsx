import { FaFacebookF, FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  socialMedia: { dest: string; text: string }[];
}

export default function SocialMedia({ socialMedia }: Props) {
  return (
    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
      {socialMedia.map((social, index) => {
        return (
          <Link
            to={social.dest}
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            key={index}
          >
            {social.text === "Facebook" ? (
              <FaFacebookF />
            ) : social.text === "Discord" ? (
              <FaDiscord />
            ) : social.text === "Twitter" ? (
              <FaTwitter />
            ) : social.text === "Github" ? (
              <FaGithub />
            ) : null}
            <span className="sr-only">{social.text}</span>
          </Link>
        );
      })}
    </div>
  );
}
