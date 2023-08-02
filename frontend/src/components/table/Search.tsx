import DropDownButton from '../drop_down/DropDownButton';
import Svg from '../svg/Svg';

export default function Search() {
  const magnyfying = {
		icon: 'm19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z',
		class: 'w-4 h-4 text-gray-500 dark:text-gray-400',
		viewBox: '0 0 20 20',
	};
  return (
		<div className='flex items-center justify-between pb-4 bg-gray-100 dark:bg-gray-900'>
			<div>
				<DropDownButton />
			</div>
			<label htmlFor='table-search' className='sr-only'>
				Search
			</label>
			<div className='relative'>
				<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
					<Svg
						icon={magnyfying.icon}
						iconClass={magnyfying.class}
						viewBox={magnyfying.viewBox}
					/>
				</div>
				<input
					type='text'
					id='table-search-users'
					className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-100 dark:focus:border-gray-100 outline-none'
					placeholder='Rechercher un livre'
				/>
			</div>
		</div>
	);
}
