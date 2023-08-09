import { useState } from 'react';
import Search from '../components/table/Search';
import Table from '../components/table/Table';

export default function HomePage() {
	const [searchField, setSearchField] = useState<string>('');

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className=' w-5/6 m-auto mt-32'>
				<Search setSearchField={setSearchField} />
				<Table searchField={searchField} />
			</div>
		</section>
	);
}
