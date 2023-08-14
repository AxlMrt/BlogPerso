import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { Dispatch, SetStateAction } from 'react';

interface Props {
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
}

export default function Pagination({
  data,
	page,
  setPage,
}: Props) {
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