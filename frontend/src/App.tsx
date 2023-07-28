import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./components/header/Header"
function App() {

  return (
		<main>
			<Header />
			<Outlet />
		</main>
	);
}

export default App
