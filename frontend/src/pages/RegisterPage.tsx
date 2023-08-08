import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IRegister } from '../app/types';
import { useAddNewUserMutation } from '../app/store/api/usersApi';
import FormInput from '../components/form_input/FormInput';

export default function RegisterPage() {
	const [addUser, { isLoading, isError, isSuccess }] = useAddNewUserMutation();
	const { register, handleSubmit } = useForm<IRegister>();
	const navigate = useNavigate();

	useEffect(() => {
		if (isSuccess) navigate('/login');
		if (isError) navigate('/');
	}, [navigate, isSuccess, isError]);

	const submitForm = async (data: IRegister) => {
		if (data.password !== data.confirmPassword)
			alert('Password mismatch');
		
		data.email = data.email.toLowerCase();
		delete data.confirmPassword;

		
		try {
			console.log(data)
			await addUser(data).unwrap();
		} catch (error) {
			console.error('Failed to create user ', error);
		}
	};

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 h-screen'>
				<Link
					to='/'
					className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
				>
					M-A Bibliotheque
				</Link>
				<div className='w-full bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							S'inscrire
						</h1>
						<form
							className='space-y-4 md:space-y-6'
							onSubmit={handleSubmit(submitForm)}
						>
							<FormInput
								type={'email'}
								text={'Votre email'}
								holder={'john.doe@gmail.com'}
								register={register}
								registerName={'email'}
							/>
							<FormInput
								type={'text'}
								text={'Prénom'}
								holder={'John'}
								register={register}
								registerName={'firstName'}
							/>
							<FormInput
								type={'text'}
								text={'Nom'}
								holder={'Doe'}
								register={register}
								registerName={'lastName'}
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
							<button
								type='submit'
								className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
								disabled={isLoading}
							>
								{isLoading ? 'Chargement..' : 'Créer'}
							</button>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Déjà un compte?{' '}
								<Link
									to='/login'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'
								>
									Se connecter
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
