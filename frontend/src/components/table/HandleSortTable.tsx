export function SortButton({
	order,
	columnKey,
	field,
	onClick,
}) {
	return (
		<button
			onClick={onClick}
			className={`${
				field === columnKey && order === 'desc'
					? 'transform -scale-y-100'
					: ''
			}`}
		>
			▲
		</button>
	);
}