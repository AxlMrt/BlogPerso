/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { useAddNewBookMutation } from '../../app/store/api/booksApi';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { IBookRegister } from '../../app/types';
import { trimUserObject } from '../../app/utils/validation';
import { bookFields } from '../../app/formFields';
import Form from '../form/Form';
import LogsTitle from '../logs_header/LogsTitle';
import CloseModalButton from '../buttons/close_modal/CloseModalButton';
import FormSubmitButton from '../buttons/form_submit/FormSubmitButton';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { setUser } from '../../app/store/slices/authSlice';
import { useLocation } from 'react-router-dom';

const FORM_ID = 'modal';

interface Props {
	refetch?: () => void;
}

export default function AddBookModal({ refetch }: Props) {
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const [addNewBook, { isLoading, isSuccess, data: successData }] =
		useAddNewBookMutation();
	const { register, handleSubmit, reset } = useForm<IBookRegister>();
	const location = useLocation();
	const closeModal = () => {
		(window as any).add_book.close();
	};

	const submitForm = async (data: any) => {
		data = trimUserObject(data);
		if (user) data.userMail = user['email'];

		try {
			await addNewBook(data);
		} catch (error) {
			console.error('Failed to create the book: ', error);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			if (location.pathname === '/table' && refetch) refetch();

			closeModal();
			reset();
			dispatch(setUser(successData?.userInfo));
			toast.success('Livre ajouté!');
		}
	}, [
		dispatch,
		isSuccess,
		location.pathname,
		refetch,
		reset,
		successData?.userInfo,
	]);

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
					<CloseModalButton close={closeModal} />
					<div className='px-6 py-6 lg:px-8'>
						<LogsTitle title={'Ajout rapide'} />
						<Form
							id={FORM_ID}
							formClass={'space-y-6 py-6'}
							handleSubmit={handleSubmit}
							submitForm={submitForm}
							fields={bookFields}
							register={register}
						/>
						<FormSubmitButton
							label={'Ajouter'}
							isLoading={isLoading}
							formId={FORM_ID}
						/>
					</div>
				</div>
			</div>
		</dialog>
	);
}
