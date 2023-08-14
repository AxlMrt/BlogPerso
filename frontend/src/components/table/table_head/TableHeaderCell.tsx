import { SortButton } from '../HandleSortTable';

export default function TableHeaderCell({
	row,
	changeSort,
	order,
	field,
}) {
	return (
		<th scope='col' className='px-6 py-3'>
			<div className='flex gap-3'>
				{row.label}
				<SortButton
					columnKey={row.key}
					onClick={(e) => changeSort(e, row.key)}
					{...{
						order,
						field,
					}}
				/>
			</div>
		</th>
	);
}
