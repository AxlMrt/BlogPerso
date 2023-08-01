import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import AccountPage from '../../pages/AccountPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '', element: <HomePage /> },
			{ path: 'login', element: <LoginPage /> },
			{ path: 'register', element: <RegisterPage /> },
			{ path: 'account', element: <AccountPage /> },
			{ path: '*', element: <Navigate replace to='/' /> },
			//{ path: 'server-error', element: <ServerError /> },
			//{ path: 'not-found', element: <NotFound /> },
		],
	},
]);
