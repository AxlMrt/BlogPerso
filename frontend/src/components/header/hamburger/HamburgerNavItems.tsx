import { Link } from "react-router-dom";

interface Props {
	navigation: {
		dest: string;
		text: string;
		class?: boolean;
		click?: () => void;
	}[];
}

export default function HamburgerNavItems({ navigation }: Props) {
  return (
		<div className='space-y-1 px-2 pb-3 pt-2'>
			{navigation.map((nav, index) => {
				return (
					<Link
						to={nav.dest}
						className={
							nav.class
								? 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
								: 'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
						}
						onClick={nav.click}
						key={index}
						reloadDocument={nav.dest === '/'}
					>
						{nav.text}
					</Link>
				);
			})}
		</div>
	);
}
