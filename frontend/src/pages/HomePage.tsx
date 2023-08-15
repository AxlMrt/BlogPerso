import ProfileCard from '../components/profile_card/ProfileCard'
import { useAppSelector } from '../app/store/configureStore';
import ReadingProgress from '../components/reading_progress/ReadingProgress';
import LikedBook from '../components/liked_book/LikedBook';
import CallToAction from '../components/call_to_action/CallToAction';

export default function HomePage() {
	const { user } = useAppSelector((state) => state.auth);

  return  (
		<main className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 w-2xl container px-2 mx-auto bg-gray-50 dark:bg-gray-900'>
			<aside className=''>
				<ProfileCard currentUser={user} />
				<ReadingProgress books={user.books} />
				<LikedBook books={user.books} />
			</aside>

			<article className=''>
				<CallToAction />
			</article>
		</main>
	);
}
