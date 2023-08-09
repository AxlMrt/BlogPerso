import { Dispatch, SetStateAction } from 'react';
import { SortKeys, SortOrder } from '../../../app/types';
import UpdateBtn from '../../buttons/update_btn/UpdateBtn';
import TableTitle from './TableHeaderCell';

interface Props {
	changeSort: (key: SortKeys) => void;
	sortOrder: SortOrder;
	sortKey: SortKeys;
	updateFields: boolean;
	setUpdateFields: Dispatch<SetStateAction<boolean>>;
}

export default function TableHead({
	changeSort,
	sortOrder,
	sortKey,
	updateFields,
	setUpdateFields,
}: Props ) {
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
				<th scope='col' className='p-4'>
					<UpdateBtn
						updateFields={updateFields}
						setUpdateFields={setUpdateFields}
					/>
				</th>
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
