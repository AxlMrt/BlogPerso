import { Link } from 'react-router-dom';

interface Props {
	isCheck: () => void;
}

export default function RememberMe({ isCheck }: Props) {
	return (
		<div className='flex flex-col items-left justify-between sm:flex-row sm:items-center'>
			<div className='flex items-start'>
				<div className='flex items-center h-5'>
					<input
						id='remember'
						aria-describedby='remember'
						type='checkbox'
						onChange={isCheck}
						className='w-3 h-3 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
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
			<Link
				to='/reset-password-request'
				className='text-xs font-medium text-primary-600 hover:underline dark:text-primary-500'
			>
				Mot de passe oublié?
			</Link>
		</div>
	);
}
