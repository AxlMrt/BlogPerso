import FollowUsLinks from "./follow_us_links/FollowUsLinks";
import { social_media } from "../../../app/social_media";

export default function FollowUs() {
  return (
    <div>
      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
        Follow us
      </h2>
      <FollowUsLinks socialMedia={social_media} />
    </div>
  );
}
