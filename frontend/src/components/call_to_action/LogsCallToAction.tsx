import { LuLogIn } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { notLoggedNavigation } from '../../app/navigation';

export default function LogsCallToAction() {
	return (
		<div className='flex flex-col items-center justify-center space-y-3 sm:space-x-4 sm:space-y-0 sm:flex-row lg:justify-start'>
			{notLoggedNavigation.map((nav, index) => {
				return (
					<Link
						to={nav.dest}
						className={
							nav.class
								? 'px-8 py-4 text-lg font-medium text-center text-white bg-primary-600 hover:bg-primary-800 rounded-md'
								: 'flex items-center space-x-2 text-gray-500 dark:text-gray-400'
						}
						key={index}
					>
						{nav.class ? (
							nav.text
						) : (
							<>
								<LuLogIn /> <span>{nav.text}</span>
							</>
						)}
					</Link>
				);
			})}
		</div>
	);
}
