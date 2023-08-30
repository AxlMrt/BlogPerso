import { social_media } from "../../../app/social_media";
import SocialMedia from "./footer_social_media/SocialMedia";
import AllRights from "./footer_all_rights/AllRights";

export default function BottomBar() {
  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      <AllRights />
      <SocialMedia socialMedia={social_media} />
    </div>
  );
}
