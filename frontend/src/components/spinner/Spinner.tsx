import { CgSpinner } from 'react-icons/cg';

export default function Spinner() {
	return (
		<div className='w-full flex justify-center'>
			<CgSpinner
				className={'inline w-10 h-10 mr-2 text-gray-400 animate-spin'}
			/>
			<span className='sr-only'>Chargement...</span>
		</div>
	);
}
