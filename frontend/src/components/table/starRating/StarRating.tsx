import { useState } from 'react'
import { useAppDispatch } from '../../../app/store/configureStore';
import { updateBookAsync } from '../../../app/store/actions/bookActions';
import { IBook } from '../../../app/types';

export default function StarRating({ book }: {book: IBook}) {
  const { id, feedBack } = book;
	const dispatch = useAppDispatch();
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState<number>(feedBack);
  

  const rateBook = (index: number) => {
    setRating(index);
    const data = { id, feedBack: index };
    console.log(data)
    dispatch(updateBookAsync(data));
	};

	return (
		<div className='star-rating'>
			{[...Array(5)].map((star, index) => {
				index += 1;
				return (
					<button
						type='button'
						key={index}
						className={index <= (hover || feedBack) ? 'text-black' : 'text-neutral-400'}
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
