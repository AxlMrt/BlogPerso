/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '../store/configureStore';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
	const { user } = useAppSelector((state) => state.auth);
	if (!user) return <Navigate to='/landing' replace />;
	// returns child route elements
	return <Outlet />;
}
