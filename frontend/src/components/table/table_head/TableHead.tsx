import { SortKeys, SortOrder } from '../../../app/types';
import TableTitle from './TableHeaderCell';

export default function TableHead({
	changeSort,
	sortOrder,
	sortKey,
}: {
	changeSort: (key: SortKeys) => void;
	sortOrder: SortOrder;
	sortKey: SortKeys;
}) {
	const headers: { key: SortKeys; label: string }[] = [
		{ key: 'year', label: 'Année' },
		{ key: 'title', label: 'Titre' },
		{ key: 'author', label: 'Auteur' },
		{ key: 'isRead', label: 'Status' },
		{ key: 'type', label: 'Genre' },
	];
	return (
		<thead className='text-xs text-gray-700 uppercase bg-gray-200  dark:bg-gray-700 dark:text-gray-400'>
			<tr>
				{headers.map((row, index) => {
					return (
						<TableTitle
							row={row}
							changeSort={changeSort}
							sortOrder={sortOrder}
							sortKey={sortKey}
							key={index}
						/>
					);
				})}
			</tr>
		</thead>
	);
}
