import { Link } from 'react-router-dom';


export default function Navigation({ navbar }: { navbar: boolean }) {
	const navLinks = [
		{ title: 'Home', path: '/' },
		{ title: 'Bibliothèque', path: '#' },
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		{ title: 'Ajouter', path: '#', click: () => (window as any).add_book.showModal() },
	];

	return (
		<div
			className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${
				navbar ? 'block' : 'hidden'
			}`}
		>
			<div className='items-center lg:flex lg:w-auto lg:order-1'>
				<ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
					{navLinks.map((link) => {
						return (
							<li>
								<Link
									to={link.path}
									key={link.title}
									className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
									aria-current='page'
									onClick={link.click}
								>
									{link.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
