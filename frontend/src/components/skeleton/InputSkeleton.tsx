import { PiMagnifyingGlassBold } from 'react-icons/pi';

export default function InputSkeleton() {
  return (
		<div className='flex flex-col items-left justify-between pb-1 md:flex-row md:items-center animate-pulse'>
			<label className='sr-only'>Search</label>
			<div className='relative'>
				<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
					<PiMagnifyingGlassBold className={'dark:text-white'} />
				</div>
				<input
					type='text'
					className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-76 bg-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-100 dark:focus:border-gray-100 outline-none'
					disabled
				/>
			</div>
		</div>
	);
}
