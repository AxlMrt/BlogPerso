import ProfileCard from "../components/profile_card/ProfileCard";
import { useAppSelector } from "../app/store/configureStore";
import ReadingProgress from "../components/reading_progress/ReadingProgress";
import LikedBook from "../components/liked_book/LikedBook";
import CreateBookCallToAction from "../components/call_to_action/CreateBookCallToAction";
import AddBookModal from "../components/modal/AddBookModal";

export default function HomePage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
		<section className='min-h-screen  bg-gray-50 dark:bg-gray-900'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 py-12 w-2xl container px-2 mx-auto'>
          
        <aside className=''>
          <ProfileCard currentUser={user!} />
          <ReadingProgress books={user!['books']} />
          <LikedBook books={user!['books']} />
        </aside>

        <article className=''>
          <CreateBookCallToAction />
        </article>
      </div>
			<AddBookModal />
		</section>
	);
}
