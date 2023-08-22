import { Dispatch, MouseEvent, SetStateAction } from 'react';
import Search from '../../table/Search';
import FiltersInputs from './FiltersInputs';

interface Props {
	filtersVisible: boolean;
	order: string;
	type: string;
	row: { label: string; key: string };
	setSearchField: Dispatch<SetStateAction<string>>;
	changeSort: (e: MouseEvent<HTMLDivElement>, key: string) => void;
}

export default function FilterBooks({
	filtersVisible,
	order,
	type,
	row,
	setSearchField,
	changeSort,
}: Props) {
	return (
		<div
			className={`${
				filtersVisible ? 'block' : 'hidden'
			} absolute top-5 left-0 z-10 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
		>
			<div className='bg-gray-900 text-white hover:bg-gray-800 hover:text-gray-200 px-3 py-2 text-sm font-medium cursor-pointer'>
				Filtres:
			</div>
			<div>
				<div className='flex flex-col gap-3 text-gray-600 bg-white rounded-md px-2 py-1 text-sm font-medium cursor-pointer'>
					<FiltersInputs
						order={order}
						orderChecked={'asc'}
						type={type}
						row={row.key}
						changeSort={changeSort}
					/>
					<FiltersInputs
						order={order}
						orderChecked={'desc'}
						type={type}
						row={row.key}
						changeSort={changeSort}
					/>

					<Search setSearchField={setSearchField} placeholder={'Rechercher'} />
				</div>
			</div>
		</div>
	);
}

/* {
	types.map(({ type }: { type: string }, index: number) => {
		if (type)
			return (
				<div
					className='text-gray-600 bg-white hover:bg-gray-200 hover:text-gray-800 block rounded-md px-2 py-1 text-sm font-medium cursor-pointer'
					key={index}
					onClick={() => setType(type)}
				>
					{type}
				</div>
			);
	});
} */
