import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

export default function Search({ setSearchField }: { setSearchField: Dispatch<SetStateAction<string>>; }) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchField(e.target.value);
	};
	return (
		<div className='flex flex-col items-left justify-between pb-4 bg-gray-100 dark:bg-gray-900 md:flex-row md:items-center'>
			<label htmlFor='table-search' className='sr-only'>
				Search
			</label>
			<div className='relative'>
				<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
					<PiMagnifyingGlassBold />
				</div>
				<input
					type='text'
					id='table-search-users'
					className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-76 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-100 dark:focus:border-gray-100 outline-none'
					placeholder='Rechercher un livre'
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
