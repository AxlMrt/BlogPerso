/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IRegister } from '../app/types';
import { trimUserObject } from '../app/utils';
import { setUser } from '../app/store/slices/authSlice';
import { useUpdateUserMutation } from '../app/store/api/usersApi';
import { useAppDispatch, useAppSelector } from '../app/store/configureStore';
import DeleteModal from '../components/modal/DeleteModal';
import DragAndDrop from '../components/drag_and_drop/DragAndDrop';
import Input from '../components/form/form_input/Input';
import { signupFields } from '../app/formFields';
import { toast } from 'react-toastify';

export default function AccountPage() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);
	const [updateUser, { isLoading }] = useUpdateUserMutation();
	const { register, handleSubmit } = useForm<IRegister>();
	const [file, setFile] = useState<Blob | MediaSource | null>(null);
	const navigate = useNavigate();

	const submitForm = async (data: any) => {
		data = trimUserObject(data);
		data.id = user!['id'];
	
		if (data.password !== data.confirmPassword) toast.error('Les mots de passe ne correspondent pas.');
		delete data.confirmPassword;

		if (file) {
			const formData = new FormData();
			formData.append('photo', data.photo[0]);
			data = { ...data, photo: Date.now() + data.photo[0].name };
			formData.append('user', JSON.stringify(data));

			try {
				await updateUser({ id: user!['id'], formData })
					.then((res: any) => dispatch(setUser(res.data)))
					.finally(() => navigate(0));
			} catch (error) {
				console.error('Failed to update the user: ', error);
			}
		} else {
			data.photo = user!['photo'];
			try {
				await updateUser({ id: user!['id'], formData: data })
					.then((res: any) => dispatch(setUser(res.data)))
					.finally(() => navigate(0));
			} catch (error) {
				console.error('Failed to update the user: ', error);
			}
		}
	};

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
										: field.placeholder === 'john.doe@gmail.com' ? user!['email'] : field.placeholder
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
		</section>
	);
}
