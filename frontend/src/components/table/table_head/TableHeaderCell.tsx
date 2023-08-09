import { SortButton } from '../HandleSortTable';
import { SortKeys, SortOrder } from '../../../app/types';

export default function TableTitle({
	row,
	changeSort,
	sortOrder,
	sortKey,
}: {
	row: { key: SortKeys; label: string };
	changeSort: (key: SortKeys) => void;
	sortOrder: SortOrder;
	sortKey: SortKeys;
}) {
	return (
		<th scope='col' className='px-6 py-3'>
			<div className='flex gap-3'>
				{row.label}
				<SortButton
					columnKey={row.key}
					onClick={() => changeSort(row.key)}
					{...{
						sortOrder,
						sortKey,
					}}
				/>
			</div>
		</th>
	);
}
