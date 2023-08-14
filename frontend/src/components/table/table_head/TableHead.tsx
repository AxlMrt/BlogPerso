import { Dispatch, SetStateAction } from 'react';
import { IBook, SortKeys, SortOrder } from '../../../app/types';
import UpdateBtn from '../../buttons/update_btn/UpdateBtn';
import TableHeaderCell from './TableHeaderCell';

interface Props {
	changeSort: (key: SortKeys) => void;
	sortOrder: SortOrder;
	sortKey: SortKeys;
	updateFields: boolean;
	setUpdateFields: Dispatch<SetStateAction<boolean>>;
	books: IBook[]
}

export default function TableHead({
	changeSort,
	order,
	field,
	updateFields,
	setUpdateFields,
	books
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
				<th scope='col' className={`${books.length ? 'block' : 'hidden'} p-4`}>
					<UpdateBtn
						updateFields={updateFields}
						setUpdateFields={setUpdateFields}
					/>
				</th>
				{headers.map((row, index) => {
					return (
						<TableHeaderCell
							row={row}
							changeSort={changeSort}
							order={order}
							field={field}
							key={index}
						/>
					);
				})}
			</tr>
		</thead>
	);
}
