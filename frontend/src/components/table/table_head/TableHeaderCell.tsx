import { MouseEvent } from "react";
import { SortButton } from "../../buttons/sort_table_button/SortButton";

interface Props {
	row: { label: string; key: string };
	changeSort: (e: MouseEvent<HTMLButtonElement>, key: string) => void;
	field: string;
	order: string;
}

export default function TableHeaderCell({
	row,
	changeSort,
	field,
	order,
}: Props) {
	return (
		<th scope='col' className='px-6 py-3'>
			<div className='flex gap-3'>
				{row.label}
				<SortButton
					columnKey={row.key}
					onClick={(e: MouseEvent<HTMLButtonElement>) => changeSort(e, row.key)}
					{...{
						order,
						field,
					}}
				/>
			</div>
		</th>
	);
}
