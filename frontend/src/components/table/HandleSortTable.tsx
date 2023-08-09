import { MouseEventHandler } from "react";
import { BookData, SortKeys, SortOrder } from "../../app/types";

export function sortData({
	tableData,
	sortKey,
	reverse,
}: {
	tableData: BookData;
	sortKey: SortKeys;
	reverse: boolean;
}) {
	if (!sortKey) return tableData;

	const sortedData = tableData.sort(
		(
			a: { [x: string]: number | string },
			b: { [x: string]: number | string }
		) => {
			console.log(a[sortKey]);
			return a[sortKey] > b[sortKey] ? 1 : -1;
		}
	);

	if (reverse) {
		return sortedData.reverse();
	}

	return sortedData;
}

export function SortButton({
	sortOrder,
	columnKey,
	sortKey,
	onClick,
}: {
	sortOrder: SortOrder;
	columnKey: SortKeys;
	sortKey: SortKeys;
	onClick: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<button
			onClick={onClick}
			className={`${
				sortKey === columnKey && sortOrder === 'desc'
					? 'transform -scale-y-100'
					: ''
			}`}
		>
			▲
		</button>
	);
}

