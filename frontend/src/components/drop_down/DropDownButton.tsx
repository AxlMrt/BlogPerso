import React from 'react'
import Svg from '../svg/Svg';

export default function DropDownButton() {
	const downArrow = {
		icon: 'm1 1 4 4 4-4',
		class: 'w-2.5 h-2.5 ml-2.5',
		viewBox: '0 0 10 6',
	};

  return (
		<button
			id='dropdownActionButton'
			data-dropdown-toggle='dropdownAction'
			className='inline-flex items-center text-gray-900 border border-gray-300 focus:ring-1 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'
			type='button'
		>
			<span className='sr-only'>Action button</span>
			Action
			<Svg
				icon={downArrow.icon}
				iconClass={downArrow.class}
				viewBox={downArrow.viewBox}
			/>
		</button>
	);
}
