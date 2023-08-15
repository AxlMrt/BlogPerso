/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAddNewBookMutation } from '../../app/store/api/booksApi';
import { useAppSelector } from '../../app/store/configureStore';
import {  IBookRegister } from '../../app/types';
import Svg from '../svg/Svg';
import FormInput from '../form_input/FormInput';
import { trimUserObject } from '../../app/utils';

export default function Modal() {
	const { user } = useAppSelector((state) => state.auth);
	const [addNewBook, { isLoading }] = useAddNewBookMutation();
	const { register, handleSubmit } = useForm<IBookRegister>();
	const navigate = useNavigate();

	const closeIcon = {
		icon: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
		class: 'w-5 h-5',
		viewBox: '0 0 20 20',
	};

	const closeModal = () => {

		(window as any).add_book.close();
	};

	const submitForm = async (data: any) => {
		data = trimUserObject(data);
		if (user) data.userMail = user['email'];
		if (data.year) data.year = parseInt(data.year);

		try {
			await addNewBook(data).then(() => navigate(0));
		} catch (error) {
			console.error('Failed to save the book: ', error);
		}
	};

	return (
		<dialog
			id='add_book'
			className='fixed z-50 w-full max-w-full p-4 overflow-x-hidden overflow-y-auto md:p-12 h-screen max-h-full justify-center items-center bg-white bg-opacity-25 dark:bg-gray-700 dark:bg-opacity-30'
			onClick={closeModal}
		>
			<div
				className='relative w-full max-w-md max-h-full m-auto'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
					<button
						type='button'
						className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
						onClick={closeModal}
					>
						<Svg
							icon={closeIcon.icon}
							iconClass={closeIcon.class}
							viewBox={closeIcon.viewBox}
						/>
						<span className='sr-only'>Close modal</span>
					</button>
					<div className='px-6 py-6 lg:px-8'>
						<h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>
							Ajouter un livre
						</h3>
						<form className='space-y-6' onSubmit={handleSubmit(submitForm)}>
							<FormInput
								type={'text'}
								text={'Titre'}
								holder={'ex: Harry Potter'}
								register={register}
								registerName={'title'}
							/>
							<FormInput
								type={'text'}
								text={'Auteur'}
								holder={'ex: J.K. Rowling'}
								register={register}
								registerName={'author'}
							/>
							<FormInput
								type={'text'}
								text={'Genre'}
								holder={'ex: Roman, Fantaisie'}
								register={register}
								registerName={'type'}
							/>
							<FormInput
								type={'text'}
								text={'Année de parution'}
								holder={'ex: 1997'}
								register={register}
								registerName={'year'}
							/>
							<FormInput
								type={'text'}
								text={'Éditeur'}
								holder={'ex: Bloomsbury Publishing'}
								register={register}
								registerName={'publisher'}
							/>

							<button
								type='submit'
								className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
							>
								{isLoading ? 'Chargement...' : 'Ajouter'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</dialog>
	);
}
