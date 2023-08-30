import FollowUs from "./footer_follow_us/FollowUs";
import Resources from "./footer_resources/Resources";
import Legal from "./footer_legal/Legal";
import FooterTitle from "./footer_title/FooterTitle";
import BottomBar from "./footer_bottom/BottomBar";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border dark:border-none ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <FooterTitle />
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <Resources />
            <FollowUs />
            <Legal />
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <BottomBar />
      </div>
    </footer>
  );
}
