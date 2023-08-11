/* eslint-disable react-hooks/rules-of-hooks */
import Spinner from '../../components/spinner/Spinner';
import { useAppSelector } from '../store/configureStore';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
	const { user, loading } = useAppSelector((state) => state.auth);
	if (loading) return <Spinner />
	if (!user) return <Navigate to='/landing' replace />;
	// returns child route elements
	return <Outlet />;
}
