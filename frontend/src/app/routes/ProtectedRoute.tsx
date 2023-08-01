import { useAppSelector } from '../store/configureStore';
import { Outlet } from 'react-router-dom';
import ErrorHandling from '../errors/ErrorHandling';

export default function ProtectedRoute() {
  const { userInfo } = useAppSelector((state) => state.auth);

	if (!userInfo) {
		return (
			<ErrorHandling
				status={403}
				detail={'Non autorisé'}
        description={'Vous devez vous connecter pour accéder à cette page'}
        btn={"login"}
			/>
		);
	}

	// returns child route elements
	return <Outlet />;
}
