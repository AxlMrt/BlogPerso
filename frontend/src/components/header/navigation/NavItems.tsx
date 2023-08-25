import { IoMdAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface Props {
	navigation: {
		dest: string;
		text: string;
		class?: boolean;
		click?: () => void;
	}[];
}

export default function NavItems({ navigation }: Props) {
	return (
		<div className='hidden sm:ml-6 sm:block text-gray-600 '>
			<div className='flex space-x-4'>
				{navigation.map((nav, index) => {
					return (
						<Link
							to={nav.dest}
							className={
								nav.class
									? 'flex items-center justify-center bg-gray-300 text-black  rounded-md px-3 py-2 text-sm font-medium dark:bg-gray-900 dark:text-gray-300 dark:hover:text-white'
									: 'hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-sm font-medium dark:hover:text-white dark:hover:bg-gray-700'
							}
							onClick={nav.click}
							key={index}
						>
							{nav.text === 'Ajout rapide' ? (
								<IoMdAddCircleOutline size={20} />
							) : (
								nav.text
							)}
						</Link>
					);
				})}
			</div>
		</div>
	);
}
