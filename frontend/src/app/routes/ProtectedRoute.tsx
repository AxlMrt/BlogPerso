import { useAppSelector } from '../store/configureStore';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { userInfo } = useAppSelector((state) => state.auth);

	if (!userInfo)
		return <Navigate to='/landing' replace />;

	// returns child route elements
	return <Outlet />;
}
