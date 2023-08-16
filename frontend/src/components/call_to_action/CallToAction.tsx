/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAddNewBookMutation } from '../../app/store/api/booksApi';
import { useAppSelector } from '../../app/store/configureStore';
import { IBookRegister } from '../../app/types';
import { useState } from 'react';
import { trimUserObject } from '../../app/utils';
import Form from '../form/Form';
import { bookFullFields } from '../../app/formFields';

const FORM_ID = 'callToAction';

export default function CallToAction() {
	const { user } = useAppSelector((state) => state.auth);
	const [addNewBook, { isLoading }] = useAddNewBookMutation();
	const { register, handleSubmit } = useForm<IBookRegister>();
	const [hover, setHover] = useState(0);
	const [rating, setRating] = useState<number>(0);
	const navigate = useNavigate();

	const submitForm = async (data: any) => {
		data = trimUserObject(data);
		if (user) data.userMail = user['email'];
		if (data.year) data.year = parseInt(data.year);

		data.feedBack = rating;
		console.log(data);
		try {
			await addNewBook(data).then(() => navigate(0));
		} catch (error) {
			console.error('Failed to save the book: ', error);
		}
	};

	return (
		<div className='bg-white dark:bg-gray-800 shadow rounded-lg mb-6 py-6 px-6 dark:text-white md:px-12'>
			<h5 className='text-lg underline'>
				Ajoutez un livre à votre collection !
			</h5>
			<Form
				id={FORM_ID}
				formClass={'grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'}
				handleSubmit={handleSubmit}
				submitForm={submitForm}
				fields={bookFullFields}
				register={register}
			/>
			<div className='text-center mt-10'>
				<p>Qu'en avez-vous pensé ?</p>
				{[...Array(5)].map((_star, index) => {
					index += 1;
					return (
						<button
							type='button'
							key={index}
							className={`${
								index <= (hover || rating)
									? 'text-yellow-500'
									: 'text-neutral-400'
							} w-6`}
							onClick={() => setRating(index)}
							onMouseEnter={() => setHover(index)}
							onMouseLeave={() => setHover(rating)}
						>
							<span className='w-full'>&#9733;</span>
						</button>
					);
				})}
			</div>

			<footer className='flex justify-center mt-6'>
				<button
					type='submit'
					form={FORM_ID}
					className='flex items-center gap-3 py-2 px-4 rounded-lg text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				>
					{isLoading ? 'Chargement..' : 'Ajouter'}
					<IoMdAddCircleOutline />
				</button>
			</footer>
		</div>
	);
}
