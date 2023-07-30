import { MouseEventHandler, ReactElement } from 'react'

export default function SwitcherButton({
	svg,
	toggle,
}: {
	svg: ReactElement;
	toggle: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<button
			onClick={toggle}
			className='text-gray-500 dark:text-gray-400 bg-white shadow-none p-2 focus:outline-none text-lg rounded-full outline-none ring-transparent cursor-pointer'
		>
			{svg}
		</button>
	);
}
