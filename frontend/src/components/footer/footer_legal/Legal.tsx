import { legal_links } from "../../../app/legal";
import LegalLinks from "./legal_links/LegalLinks";

export default function Legal() {
  return (
    <div>
      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
        Legal
      </h2>
      <LegalLinks legal={legal_links} />
    </div>
  );
}
