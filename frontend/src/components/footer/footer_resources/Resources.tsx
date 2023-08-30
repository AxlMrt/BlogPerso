import ResourcesLinks from "./resources_links/ResourcesLinks";
import { resources_links } from "../../../app/resources";

export default function Resources() {
  return (
    <div>
      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
        Resources
      </h2>
      <ResourcesLinks resources={resources_links} />
    </div>
  );
}
