import Search from '../components/table/Search';
import Table from '../components/table/Table';

export default function HomePage() {
  return (
		<main>
			<div className=' w-5/6 m-auto mt-32'>
				<Search />
				<Table />
			</div>
		</main>
	);
}
