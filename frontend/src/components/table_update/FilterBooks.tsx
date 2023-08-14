import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { BaseQueryArg } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { useGetBookFiltersQuery } from "../../app/store/api/userQueryApi";
import { useAppSelector } from "../../app/store/configureStore";
import Spinner from "../spinner/Spinner";
import { Dispatch, SetStateAction } from "react";

interface Props {
	filtersVisible: boolean;
	setType: Dispatch<SetStateAction<string>>;
}

export default function FilterBooks({ filtersVisible, setType }: Props) {
	const { user } = useAppSelector((state) => state.auth);
	const { data: types = [], isLoading } = useGetBookFiltersQuery<
		BaseQueryArg<BaseQueryFn>
	>(user.id);

	return (
		<div
			className={`${
				filtersVisible ? 'block' : 'hidden'
			} absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1`}
		>
			{isLoading ? (
				<Spinner />
			) : (
				<div>
					<div
						className='bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-black  rounded-md px-3 py-2 text-sm font-medium dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'
						onClick={() => setType('')}
					>
						Filtres:
					</div>
					{types.map(({ type }: { type: string }, index: number) => {
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
					})}
				</div>
			)}
		</div>
	);
}

