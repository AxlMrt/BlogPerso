/* eslint-disable @typescript-eslint/no-explicit-any */
import Svg from '../components/svg/Svg';
import { useForm } from 'react-hook-form';
import { IRegister, IUser } from '../app/types';
import {
	useGetUserQuery,
	useUpdateUserMutation,
} from '../app/store/api/usersApi';
import { useState } from 'react';
import FormInput from '../components/form_input/FormInput';
import { trimUserObject } from '../app/utils';

export default function AccountPage() {
	const imageIcon = {
		icon: 'M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02',
		class: 'mx-auto h-12 w-12 dark:text-white',
		viewBox: '0 0 48 48',
	};

	const user = JSON.parse(localStorage.getItem('user')!);
	const currentUser = useGetUserQuery(user.id).data || user;
	
	const [updateUser, { isLoading }] = useUpdateUserMutation();
	const [file, setFile] = useState(null);
	const { register, handleSubmit } = useForm<IRegister>();
	
	const submitForm = async (data: any) => {
		data = trimUserObject(data);
		if (data.password !== data.confirmPassword) alert('Password mismatch');
		delete data.confirmPassword;

		if (file) {
			const formData = new FormData();
			formData.append('photo', data.photo[0]);
			data = { ...data, photo: Date.now() + data.photo[0].name };
			formData.append('user', JSON.stringify(data));

			try {
				await updateUser({ id: currentUser.id, formData }).then(() =>
					window.location.reload()
				);
			} catch (error) {
				console.error('Failed to update the user: ', error);
			}
		} else {
			data.photo = currentUser.photo;
			try {
				await updateUser({ id: currentUser.id, formData: data }).then(() => window.location.reload());
			} catch (error) {
				console.error('Failed to update the user: ', error);
			}
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, role, createdAt, updatedAt, ...others } = currentUser;
	localStorage.setItem('user', JSON.stringify(others));

	return (
		<section className='px-6 py-4 bg-gray-50 dark:bg-gray-900'>
			<div className='max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20'>
				<h1 className='text-xl font-bold capitalize dark:text-white'>
					Account settings
				</h1>
				<form onSubmit={handleSubmit(submitForm)}>
					<div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
						<FormInput
							type={'text'}
							text={'Prénom'}
							holder={currentUser.firstName}
							register={register}
							registerName={'firstName'}
						/>
						<FormInput
							type={'text'}
							text={'Nom'}
							holder={currentUser.lastName}
							register={register}
							registerName={'lastName'}
						/>
						<FormInput
							type={'email'}
							text={'E-mail'}
							holder={currentUser.email}
							register={register}
							registerName={'email'}
						/>
						<FormInput
							type={'password'}
							text={'Mot de passe'}
							holder={'••••••••'}
							register={register}
							registerName={'password'}
						/>
						<FormInput
							type={'password'}
							text={'Confirmer mot de passe'}
							holder={'••••••••'}
							register={register}
							registerName={'confirmPassword'}
						/>
						<div className='hidden'>
							<input
								type='text'
								{...register('id', {
									setValueAs: (x: string) => (x ? user.id : user.id),
								})}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium dark:text-white'>
								Image
							</label>
							<div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
								<div className='space-y-1 text-center'>
									{file ? (
										<img src={URL.createObjectURL(file)} alt='' />
									) : (
										<Svg
											icon={imageIcon.icon}
											iconClass={imageIcon.class}
											viewBox={imageIcon.viewBox}
										/>
									)}

									<div className='flex text-sm text-gray-600'>
										<label
											htmlFor='file-upload'
											className='relative cursor-pointer font-medium text-primary-500 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
										>
											<span className=''>Télécharger un fichier</span>
											<input
												id='file-upload'
												type='file'
												className='sr-only'
												{...register('photo', {
													onChange: (e) => setFile(e.target.files[0]),
													setValueAs: (x: string) =>
														x ? x : currentUser.photo,
												})}
											/>
										</label>
										<p className='pl-1 dark:text-white'>ou glisser-déposer</p>
									</div>
									<p className='text-xs dark:text-white'>
										PNG, JPG, GIF jusqu'à 10MB
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className='flex justify-end mt-6'>
						<button className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'>
							{isLoading ? 'Chargement..' : 'Valider'}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
