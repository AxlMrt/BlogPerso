import ProfileCard from '../components/profile_card/ProfileCard'
import Spinner from '../components/spinner/Spinner';
import { useGetUserQuery } from '../app/store/api/usersApi';
import { useAppSelector } from '../app/store/configureStore';
import ReadingProgress from '../components/reading_progress/ReadingProgress';
import LikedBook from '../components/liked_book/LikedBook';
import CallToAction from '../components/call_to_action/CallToAction';

export default function Home() {
  const { user } = useAppSelector((state) => state.auth);
	const { data: currentUser, isLoading } = useGetUserQuery(user.id);
  return isLoading ? (
		<Spinner />
	) : (
		<main className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 w-2xl container px-2 mx-auto bg-gray-50 dark:bg-gray-900'>
			<aside className=''>
				<ProfileCard currentUser={currentUser!} />
				<ReadingProgress books={currentUser!.books} />
				<LikedBook books={currentUser!.books} />
			</aside>

			<article className=''>
				<CallToAction />

				
			</article>
		</main>
	);
}
