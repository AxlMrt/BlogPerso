/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IRegister } from '../app/types';
import { trimUserObject, validPassword } from '../app/utils/validation';
import { setUser } from '../app/store/slices/authSlice';
import { useUpdateUserMutation } from '../app/store/api/usersApi';
import { useAppDispatch, useAppSelector } from '../app/store/configureStore';
import DeleteModal from '../components/modal/DeleteModal';
import DragAndDrop from '../components/drag_and_drop/DragAndDrop';
import Input from '../components/form/form_input/Input';
import { signupFields } from '../app/formFields';
import { toast } from 'react-toastify';
import AddBookModal from '../components/modal/AddBookModal';

export default function AccountPage() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);
	const [updateUser, { isLoading, isSuccess, data: successData }] = useUpdateUserMutation();
	const { register, handleSubmit, reset } = useForm<IRegister>();
	const [file, setFile] = useState<Blob | MediaSource | null>(null);
	const navigate = useNavigate();

	const submitForm = async (data: any) => {
		data = trimUserObject(data);
		data.id = user!['id'];
	
		if (file)
			data.photo = file;

		if (data.email)
			data.email = data.email.toLowerCase();

		if (data.password) {
			if (data.password !== data.confirmPassword) {
				toast.error('Les mots de passe ne correspondent pas.');
				return;
			}

			if (!validPassword(data.password)) {
				toast.error(
					'Votre mot de passe doit comporter entre 6 et 20 caractères et contenir une majuscule, un chiffre et un caractère spécial.'
				);
				return;
			}
		}
		
		delete data.confirmPassword;

		if (file) {
			const formData = new FormData();

			formData.append('photo', data.photo);
			data = { ...data, photo: Date.now() + data.photo.name };
			formData.append('user', JSON.stringify(data));
			try {
				await updateUser({ id: user!['id'], formData });
			} catch (error) {
				console.error('Failed to update the user: ', error);
			}
		} else {
			data.photo = user!['photo'];
			try {
				await updateUser({ id: user!['id'], formData: data });
			} catch (error) {
				console.error('Failed to update the user: ', error);
			}
		}
	};

	useEffect(() => {
		if (isSuccess) {
			dispatch(setUser(successData));
			reset();
			setFile(null);
			toast.success('Vos informations ont été mises à jour!');
		}
	}, [dispatch, isSuccess, navigate, reset, successData])

	return (
		<section className='px-6 py-4 bg-gray-50 dark:bg-gray-900'>
			<div className='max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20'>
				<h1 className='text-xl font-bold dark:text-white'>
					Modifier vos informations
				</h1>
				<form onSubmit={handleSubmit(submitForm)}>
					<div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
						{signupFields.map((field) => (
							<Input
								key={field.id}
								register={register}
								labelText={field.labelText}
								labelFor={field.labelFor}
								id={field.id}
								name={field.name}
								type={field.type}
								holder={
									field.placeholder === 'John'
										? user!['firstName']
										: field.placeholder === 'Doe'
										? user!['lastName']
										: field.placeholder === 'john.doe@gmail.com'
										? user!['email']
										: field.placeholder
								}
								isRequired={false}
							/>
						))}
						<DragAndDrop
							photo={user!['photo']}
							file={file}
							setFile={setFile}
							register={register}
						/>
					</div>

					<div className='flex flex-col-reverse gap-6 mt-6 md:flex-row md:justify-between'>
						<button
							id='deleteButton'
							className='block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-red-800'
							type='button'
							onClick={() => (window as any).deleteModal.showModal()}
						>
							Supprimer mon compte
						</button>
						<DeleteModal />

						<button className='block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800'>
							{isLoading ? 'Chargement..' : 'Valider mes informations'}
						</button>
					</div>
				</form>
			</div>
			<AddBookModal />
		</section>
	);
}
