import { Link } from "react-router-dom"

export default function RegisterPage() {
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
						<form className='space-y-4 md:space-y-6' action='#'>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Votre email
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='john.doe@mail.fr'
									required
								/>
							</div>
							<div>
								<label
									htmlFor='firstname'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Prénom
								</label>
								<input
									type='firstname'
									name='firstname'
									id='firstname'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='John'
								/>
							</div>
							<div>
								<label
									htmlFor='lastname'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Nom
								</label>
								<input
									type='lastname'
									name='lastname'
									id='lastname'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Doe'
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
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required
								/>
							</div>
							<div>
								<label
									htmlFor='confirm-password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Confirmer mot de passe
								</label>
								<input
									type='confirm-password'
									name='confirm-password'
									id='confirm-password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required
								/>
							</div>
							<button
								type='submit'
								className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							>
								Créer
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
