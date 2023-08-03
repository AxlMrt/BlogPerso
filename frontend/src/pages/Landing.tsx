import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png'

export default function Landing() {
  return (
		<section className='bg-gray-100 dark:bg-gray-900'>
			<div className='h-screen flex flex-col lg:flex-row items-center justify-center px-6'>
				<div className='flex items-center justify-center w-full lg:w-1/2'>
					<div className='max-w-2xl mb-8 text-center lg:text-left'>
						<h1 className='text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white'>
							M-A Bibliothèque
						</h1>
						<p className='py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300'>
							Découvrez notre application de gestion de livres, une solution
							intuitive pour organiser et digitaliser votre bibliothèque personnelle.
						</p>

						<div className='flex flex-col items-center justify-center space-y-3 sm:space-x-4 sm:space-y-0 sm:flex-row lg:justify-start'>
							<Link
								to='/register'
								rel='noopener'
								className='px-8 py-4 text-lg font-medium text-center text-white bg-primary-600 hover:bg-primary-800 rounded-md '
							>
								S'inscrire
							</Link>
							<Link
								to='/login'
								rel='noopener'
								className='flex items-center space-x-2 text-gray-500 dark:text-gray-400'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4'></path>
									<polyline points='10 17 15 12 10 7'></polyline>
									<line x1='15' y1='12' x2='3' y2='12'></line>
								</svg>
								<span>Connexion</span>
							</Link>
						</div>
					</div>
				</div>
				<div className='mt-10 lg:mt-0'>
					<div className='flex items-center justify-center'>
						<img
							src={heroImg}
							className={'w-full max-w-3xl object-cover'}
							alt='Hero Illustration'
							loading='eager'
							placeholder='blur'
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
