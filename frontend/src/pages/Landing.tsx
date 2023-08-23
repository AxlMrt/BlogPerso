import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/store/configureStore';
import Hero from '../components/hero/Hero';
import LogsCallToAction from '../components/call_to_action/LogsCallToAction';
import HeroTitle from '../components/hero/HeroTitle';

export default function Landing() {
	const { user } = useAppSelector((state) => state.auth);
	if (user) return <Navigate to="/" />

  return (
		<section className='bg-gray-100 dark:bg-gray-900'>
			<div className='h-screen flex flex-col lg:flex-row items-center justify-center px-6'>
				<div className='flex items-center justify-center w-full lg:w-1/2'>
					<div className='max-w-2xl mb-8 text-center lg:text-left'>
						<HeroTitle />
						<LogsCallToAction />
					</div>
				</div>
				<Hero />
			</div>
		</section>
	);
}
