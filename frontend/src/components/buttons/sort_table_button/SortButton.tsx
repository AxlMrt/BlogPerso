import { MouseEventHandler } from "react";

interface Props {
	order: string;
	field: string;
	columnKey: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

export function SortButton({ order, columnKey, field, onClick }: Props) {
	return (
		<button
			onClick={onClick}
			className={`${
				field === columnKey && order === 'desc' ? 'transform -scale-y-100' : undefined
			}`}
		>
			▲
		</button>
	);
}
