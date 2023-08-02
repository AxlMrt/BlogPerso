import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store/configureStore";
import { userLogin } from "../app/store/actions/authActions";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { IUserLogin } from "../app/types";
export default function LoginPage() {
	const { loading, userInfo } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	
	const { register, handleSubmit } = useForm<IUserLogin>();

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [navigate, userInfo]);

	const submitForm = (data: IUserLogin) => {
		dispatch(userLogin(data));
	};

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 h-screen'>
				<a
					href='#'
					className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
				>
					M-A Bibliotheque
				</a>
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Se connecter
						</h1>
						<form
							className='space-y-4 md:space-y-6'
							onSubmit={handleSubmit(submitForm)}
						>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Votre email
								</label>
								<input
									type='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='john.doe@mail.fr'
									{...register('email')}
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Mot de passe
								</label>
								<input
									type='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									{...register('password')}
								/>
							</div>
							<div className='flex items-center justify-between'>
								<div className='flex items-start'>
									<div className='flex items-center h-5'>
										<input
											id='remember'
											aria-describedby='remember'
											type='checkbox'
											className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
										/>
									</div>
									<div className='ml-3 text-sm'>
										<label
											htmlFor='remember'
											className='text-gray-500 dark:text-gray-300'
										>
											Se souvenir de moi
										</label>
									</div>
								</div>
								<a
									href='#'
									className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
								>
									Mot de passe oublié ?
								</a>
							</div>
							<button
								type='submit'
								className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
								disabled={loading}
							>
								{loading ? 'Chargement...' : 'Connexion'}
							</button>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Pas encore de compte?{' '}
								<Link
									to='/register'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'
								>
									S'inscrire
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
