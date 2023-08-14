import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { Dispatch, SetStateAction } from 'react';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { BaseQueryArg } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { useGetUserBookQuery } from '../../app/store/api/userQueryApi';
import { useAppSelector } from '../../app/store/configureStore';

interface Props {
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
}

export default function Pagination({
	page,
  setPage,
}: Props) {
		const { user } = useAppSelector((state) => state.auth);
		const { data, isLoading, isFetching } = useGetUserBookQuery<
			BaseQueryArg<BaseQueryFn>
		>({ id: user.id, page });

	return (
		<div className='items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex dark:text-white'>
			<span className='block'>
				Page {page} of {data.total_pages}
			</span>
			<div className='flex space-x-3'>
				<button
					onClick={() => setPage(page - 1)}
					disabled={page === 1}
				>
					<BsArrowLeft />
				</button>
				<button
					onClick={() => setPage(page + 1)}
					disabled={page === data.total_pages}
				>
					<BsArrowRight />
				</button>
			</div>
		</div>
	);
}
