import { useEffect } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchAllBooksAsync } from "../../app/store/actions/bookActions";
import { booksSelectors } from "../../app/store/slices/bookSlice";

export default function Table() {
	const { success } = useAppSelector((state) => state.book)
	const dispatch = useAppDispatch();

	const books = useAppSelector(booksSelectors.selectAll);
	console.log(books)
	useEffect(() => {
		if (!success) dispatch(fetchAllBooksAsync());
	}, [success, dispatch]);

	return (
		<div className='overflow-x-auto shadow-md sm:rounded-lg'>
			<table className='w-full text-sm  text-left text-gray-500 dark:text-gray-400'>
				<TableHead />
				{books.length > 0 && <TableBody />}
			</table>
			{!books.length && (
				<div className='text-center my-5'>
					<h1>Liste vide !</h1>
					Commencez votre collection littéraire: Ajoutez des livres à votre
					bibliothèque
				</div>
			)}
		</div>
	);
}
