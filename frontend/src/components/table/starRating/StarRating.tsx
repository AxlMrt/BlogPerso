import { useEffect, useState } from 'react';
import { IBook } from '../../../app/types';
import { useUpdateBookMutation } from '../../../app/store/api/booksApi';
import { useAppDispatch } from '../../../app/store/configureStore';
import { setUser } from '../../../app/store/slices/authSlice';

export default function StarRating({ book }: { book: IBook }) {
	const { feedBack } = book;
	const dispatch = useAppDispatch();
	const [updateFeedBack, { isSuccess, data: successData }] =
		useUpdateBookMutation();
	const [hover, setHover] = useState(0);
	const [rating, setRating] = useState<number>(feedBack);

	const rateBook = async (index: number) => {
		setRating(index);
		try {
			await updateFeedBack({ ...book, feedBack: index });
		} catch (error) {
			console.error('Failed to update feedback of the book: ', error);
		}
	};

	useEffect(() => {
		if (isSuccess) dispatch(setUser(successData?.userInfo));
	}, [dispatch, isSuccess, successData?.userInfo]);

	return (
		<div className='star-rating'>
			{[...Array(5)].map((_star, index) => {
				index += 1;
				return (
					<button
						type='button'
						key={index}
						className={
							index <= (hover || feedBack)
								? 'text-yellow-500'
								: 'text-neutral-400'
						}
						onClick={() => rateBook(index)}
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(rating)}
					>
						<span className='star'>&#9733;</span>
					</button>
				);
			})}
		</div>
	);
}
