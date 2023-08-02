import TableHead from "./TableHead"

export default function Table() {
	return (
		<div className='overflow-x-auto shadow-md sm:rounded-lg'>
			<table className='w-full text-sm  text-left text-gray-500 dark:text-gray-400'>
				<TableHead />
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
