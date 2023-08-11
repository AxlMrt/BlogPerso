/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { Navigate, Outlet } from 'react-router-dom';
import { fetchBooksAsync, fetchFilters } from '../store/slices/userQuerySlice';

export default function ProtectedRoute() {
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	if (!user) return <Navigate to='/landing' replace />;
	const { booksLoaded, filtersLoaded } = useAppSelector((state) => state.userQuery);

		useEffect(() => {
			if (!booksLoaded) dispatch(fetchBooksAsync(user.id));
		}, [booksLoaded, dispatch, user.id]);

		useEffect(() => {
			if (!filtersLoaded) dispatch(fetchFilters(user.id));
		}, [filtersLoaded, dispatch, user.id]);
	
	// returns child route elements
	return <Outlet />;
}
