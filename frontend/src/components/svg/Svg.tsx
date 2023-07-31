import React from 'react'

export default function Svg({
	icon,
	iconClass,
	viewBox,
}: {
	icon: string;
	iconClass: string;
	viewBox: string;
}) {
	return (
		<svg
			className={`${iconClass}`}
			fill='none'
			stroke='currentColor'
			viewBox={viewBox}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				d={icon}
			></path>
		</svg>
	);
}
