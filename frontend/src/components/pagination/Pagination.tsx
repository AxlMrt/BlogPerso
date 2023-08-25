import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { Dispatch, SetStateAction } from 'react';
import { IBook } from '../../app/types';

interface Props {
	data: { books: IBook; total: number; page: string; total_pages: number };
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
}

export default function Pagination({ data, page, setPage }: Props) {
	return (
		<div className='flex items-center justify-center text-xs space-x-3 dark:text-white'>
			<span>
				Page {page} of {data.total_pages === 0 ? 1 : data.total_pages}
			</span>
			<button
				type='button'
				onClick={() => setPage(page - 1)}
				disabled={page === 1}
			>
				<BsArrowLeft />
			</button>
			<button
				type='button'
				onClick={() => setPage(page + 1)}
				disabled={page >= data.total_pages}
			>
				<BsArrowRight />
			</button>
		</div>
	);
}
