import { RxCross2 } from 'react-icons/rx';

interface Props {
	close: () => void;
}

export default function CloseModalButton({ close }: Props) {
	return (
		<button
			type='button'
			className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
			onClick={close}
		>
			<RxCross2 size={20} />
			<span className='sr-only'>Close modal</span>
		</button>
	);
}
