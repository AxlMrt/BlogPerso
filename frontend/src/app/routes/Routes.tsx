import {
	Navigate,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import App from '../../App';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import AccountPage from '../../pages/AccountPage';
import ServerError from '../errors/ServerError';
import ErrorHandling from '../errors/ErrorHandling';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route path='login' element={<LoginPage />} />
			<Route path='register' element={<RegisterPage />} />
			<Route element={<ProtectedRoute />}>
				<Route path='' element={<HomePage />} />
				<Route path='account' element={<AccountPage />} />
			</Route>
			<Route
				path='not-found'
				element={
					<ErrorHandling
						status={404}
						detail={'Not found'}
						description={"La page que vous recherchez n'existe pas."}
					/>
				}
			/>
			<Route path='server-error' element={<ServerError />} />
			<Route path='*' element={<Navigate replace to='/not-found' />} />
		</Route>
	)
);
