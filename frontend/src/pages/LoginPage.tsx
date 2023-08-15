import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store/configureStore";
import { userLogin } from "../app/store/actions/authActions";
import { useForm } from "react-hook-form";
import { IUserLogin } from "../app/types";
import FormInput from "../components/form_input/FormInput";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
	const { loading } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	
	const { register, handleSubmit } = useForm<IUserLogin>();

	const submitForm = async (data: IUserLogin) => {
		try {
			await dispatch(userLogin(data)).then(() => navigate('/'));
		} catch (error) {
			console.log('Failed to login: ', error)
		}
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
							<FormInput
								type={'email'}
								text={'Votre email'}
								holder={'john.doe@gmail.com'}
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
