import DropDownButton from '../drop_down/DropDownButton';
import Svg from '../svg/Svg';

export default function Table() {
	const magnyfying = {
		icon: 'm19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z',
		class: 'w-4 h-4 text-gray-500 dark:text-gray-400',
		viewBox: '0 0 20 20'
	}

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg w-5/6 m-auto mt-32'>
			<div className='flex items-center justify-between pb-4 bg-white dark:bg-gray-800'>
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
						className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'
						placeholder='Rechercher un livre'
					/>
				</div>
			</div>
			<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th scope='col' className='p-4'>
							<div className='flex items-center'>
								<input
									id='checkbox-all-search'
									type='checkbox'
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label htmlFor='checkbox-all-search' className='sr-only'>
									checkbox
								</label>
							</div>
						</th>
						<th scope='col' className='px-6 py-3'>
							Titre
						</th>
						<th scope='col' className='px-6 py-3'>
							Auteur
						</th>
						<th scope='col' className='px-6 py-3'>
							Status
						</th>
						<th scope='col' className='px-6 py-3'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
						<td className='w-4 p-4'>
							<div className='flex items-center'>
								<input
									id='checkbox-table-search-1'
									type='checkbox'
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label htmlFor='checkbox-table-search-1' className='sr-only'>
									checkbox
								</label>
							</div>
						</td>
						<th
							scope='row'
							className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
						>
							<img
								className='w-10 h-10 rounded-full'
								src='/docs/images/people/profile-picture-1.jpg'
								alt='Jese image'
							/>
							<div className='pl-3'>
								<div className='text-base font-semibold'>Titre d'un livre</div>
								<div className='font-normal text-gray-500'>Note du livre</div>
							</div>
						</th>
						<td className='px-6 py-4'>Auteur</td>
						<td className='px-6 py-4'>
							<div className='flex items-center'>
								<div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>{' '}
								Lu
							</div>
						</td>
						<td className='px-6 py-4'>
							<a
								href='#'
								className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
							>
								Modifier
							</a>
						</td>
					</tr>
					<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
						<td className='w-4 p-4'>
							<div className='flex items-center'>
								<input
									id='checkbox-table-search-1'
									type='checkbox'
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label htmlFor='checkbox-table-search-1' className='sr-only'>
									checkbox
								</label>
							</div>
						</td>
						<th
							scope='row'
							className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
						>
							<img
								className='w-10 h-10 rounded-full'
								src='/docs/images/people/profile-picture-1.jpg'
								alt='Jese image'
							/>
							<div className='pl-3'>
								<div className='text-base font-semibold'>Titre d'un livre</div>
								<div className='font-normal text-gray-500'>Note du livre</div>
							</div>
						</th>
						<td className='px-6 py-4'>Auteur</td>
						<td className='px-6 py-4'>
							<div className='flex items-center'>
								<div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>{' '}
								Lu
							</div>
						</td>
						<td className='px-6 py-4'>
							<a
								href='#'
								className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
							>
								Modifier
							</a>
						</td>
					</tr>
					<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
						<td className='w-4 p-4'>
							<div className='flex items-center'>
								<input
									id='checkbox-table-search-1'
									type='checkbox'
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label htmlFor='checkbox-table-search-1' className='sr-only'>
									checkbox
								</label>
							</div>
						</td>
						<th
							scope='row'
							className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
						>
							<img
								className='w-10 h-10 rounded-full'
								src='/docs/images/people/profile-picture-1.jpg'
								alt='Jese image'
							/>
							<div className='pl-3'>
								<div className='text-base font-semibold'>Titre d'un livre</div>
								<div className='font-normal text-gray-500'>Note du livre</div>
							</div>
						</th>
						<td className='px-6 py-4'>Auteur</td>
						<td className='px-6 py-4'>
							<div className='flex items-center'>
								<div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>{' '}
								Lu
							</div>
						</td>
						<td className='px-6 py-4'>
							<a
								href='#'
								className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
							>
								Modifier
							</a>
						</td>
					</tr>
					<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
						<td className='w-4 p-4'>
							<div className='flex items-center'>
								<input
									id='checkbox-table-search-1'
									type='checkbox'
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label htmlFor='checkbox-table-search-1' className='sr-only'>
									checkbox
								</label>
							</div>
						</td>
						<th
							scope='row'
							className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
						>
							<img
								className='w-10 h-10 rounded-full'
								src='/docs/images/people/profile-picture-1.jpg'
								alt='Jese image'
							/>
							<div className='pl-3'>
								<div className='text-base font-semibold'>Titre d'un livre</div>
								<div className='font-normal text-gray-500'>Note du livre</div>
							</div>
						</th>
						<td className='px-6 py-4'>Auteur</td>
						<td className='px-6 py-4'>
							<div className='flex items-center'>
								<div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>{' '}
								Lu
							</div>
						</td>
						<td className='px-6 py-4'>
							<a
								href='#'
								className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
							>
								Modifier
							</a>
						</td>
					</tr>
					<tr className='bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600'>
						<td className='w-4 p-4'>
							<div className='flex items-center'>
								<input
									id='checkbox-table-search-3'
									type='checkbox'
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label htmlFor='checkbox-table-search-3' className='sr-only'>
									checkbox
								</label>
							</div>
						</td>
						<th
							scope='row'
							className='flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
						>
							<img
								className='w-10 h-10 rounded-full'
								src='/docs/images/people/profile-picture-4.jpg'
								alt='Jese image'
							/>
							<div className='pl-3'>
								<div className='text-base font-semibold'>Titre d'un livre</div>
								<div className='font-normal text-gray-500'>
									leslie@flowbite.com
								</div>
							</div>
						</th>
						<td className='px-6 py-4'>Auteur</td>
						<td className='px-6 py-4'>
							<div className='flex items-center'>
								<div className='h-2.5 w-2.5 rounded-full bg-red-500 mr-2'></div>{' '}
								Non lu
							</div>
						</td>
						<td className='px-6 py-4'>
							<a
								href='#'
								className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
							>
								Modifier
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
