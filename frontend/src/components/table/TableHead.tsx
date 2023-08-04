export default function TableHead() {
  return (
		<thead className='text-xs text-gray-700 uppercase bg-gray-200  dark:bg-gray-700 dark:text-gray-400'>
			<tr>
				<th scope='col' className='px-6 py-3'>
					Année
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
	);
}
