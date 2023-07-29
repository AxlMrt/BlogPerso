import { Outlet } from 'react-router-dom';
import Header from "./components/header/Header"
function App() {

  return (
		<main className='bg-white dark:dark:bg-gray-800 h-screen'>
			<Header />
			<Outlet />
		</main>
	);
}

export default App
