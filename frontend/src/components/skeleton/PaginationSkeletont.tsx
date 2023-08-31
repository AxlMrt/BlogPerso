import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export default function PaginationSkeleton() {
  return (
		<div className='flex p-4 justify-end animate-pulse'>
			<div className='flex items-center'>
				<div className='flex items-center justify-center text-xs space-x-3 dark:text-white'>
					<span>
						Page 1 of 1
					</span>
					<button
						type='button'
						disabled
					>
						<BsArrowLeft />
					</button>
					<button
						type='button'
						disabled
					>
						<BsArrowRight />
					</button>
				</div>
			</div>
		</div>
	);
}
