import { Outlet } from 'react-router-dom';
import Header from "./components/header/Header";
import Modal from './components/modal/Modal';

function App() {
  return (
		<main className='bg-white dark:dark:bg-gray-800 h-screen'>
			<Header />
			<Outlet />
			<Modal />
		</main>
	);
}

export default App
