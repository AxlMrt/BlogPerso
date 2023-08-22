import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
import { SortButton } from '../../buttons/sort_table_button/SortButton';
import FilterBooks from '../../table_update/filters/FilterBooks';

interface Props {
	field: string;
	order: string;
	type: string;
	tableHeadFilterVisible: boolean;
	row: { label: string; key: string };
	setSearchField: Dispatch<SetStateAction<string>>;
	setType: Dispatch<SetStateAction<string>>;
	setTableHeadFilterVisible: Dispatch<SetStateAction<boolean>>;
	changeSort: (e: MouseEvent<HTMLDivElement>, key: string) => void;
}

export default function TableHeaderCell({
	field,
	order,
	type,
	tableHeadFilterVisible,
	row,
	setSearchField,
	setType,
	setTableHeadFilterVisible,
	changeSort,
}: Props) {
	const [visible, setVisible] = useState<boolean>(tableHeadFilterVisible);

	const handleClick = (e: MouseEvent) => {
		e.stopPropagation();
		setVisible(!visible);
		setTableHeadFilterVisible(true);
		setType(row.key);
	};

	useEffect(() => {
		if (!tableHeadFilterVisible) {
			setVisible(false);
		}
	}, [tableHeadFilterVisible]);

	return (
		<th scope='col' className='px-6 py-3'>
			<div className='relative flex gap-3 cursor-pointer' onClick={handleClick}>
				{row.label}
				<SortButton
					columnKey={row.key}
					{...{
						order,
						field,
					}}
				/>
				<FilterBooks
					filtersVisible={visible}
					changeSort={changeSort}
					row={row}
					order={order}
					type={type}
					setSearchField={setSearchField}
				/>
			</div>
		</th>
	);
}
