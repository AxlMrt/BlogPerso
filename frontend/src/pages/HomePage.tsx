import Search from '../components/table/Search';
import Table from '../components/table/Table';

export default function HomePage() {
	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className=' w-5/6 m-auto mt-32'>
				<Search />
				<Table />
			</div>
		</section>
	);
}
