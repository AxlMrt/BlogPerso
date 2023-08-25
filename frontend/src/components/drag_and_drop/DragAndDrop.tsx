import {
	SetStateAction,
	Dispatch,
	useState,
	useRef,
	MouseEvent,
	ChangeEvent,
	DragEvent,
} from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IRegister } from '../../app/types';
import Svg from '../svg/Svg';
const imageIcon = {
	icon: 'M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02',
	class: 'mx-auto h-12 w-12 dark:text-white',
	viewBox: '0 0 48 48',
};

interface Props {
	photo: HTMLImageElement;
	file: Blob | MediaSource | null;
	setFile: Dispatch<SetStateAction<Blob | MediaSource | null>>;
	register: UseFormRegister<IRegister>;
}

export default function DragAndDrop({ file, setFile, register }: Props) {
	const [dragActive, setDragActive] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleDrag = function (e: MouseEvent<HTMLElement>) {
		e.preventDefault();
		e.stopPropagation();

		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = function (e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		e.stopPropagation();

		setDragActive(false);
		if (e.dataTransfer!.files && e.dataTransfer!.files[0]) {
			setFile(e.dataTransfer.files![0]);
		}
	};

	const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();

		if (
			(e.target as HTMLInputElement).files &&
			(e.target as HTMLInputElement).files![0]
		) {
			setFile((e.target as HTMLInputElement).files![0]);
		}
	};

	const onButtonClick = (e: MouseEvent<HTMLElement>) => {
		e.preventDefault();
		inputRef.current!.click();
	};

	return (
		<div onDragEnter={handleDrag} className='space-y-1 text-center relative'>
			<input
				{...register('photo', {
					onChange: (e) => handleChange(e),
				})}
				ref={inputRef}
				type='file'
				className='hidden'
			/>
			<label
				className={
					'w-full h-full mt-1 flex flex-col justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'
				}
			>
				{file ? (
					<img src={URL.createObjectURL(file)} className='w-32' alt='' />
				) : (
					<Svg
						icon={imageIcon.icon}
						iconClass={imageIcon.class}
						viewBox={imageIcon.viewBox}
					/>
				)}
				<div className='dark:text-white'>
					<p>Glisser-déposer ou</p>
					<button
						className='cursor-pointer font-medium text-primary-500 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
						onClick={onButtonClick}
					>
						Télécharger un fichier
					</button>
					<p className='text-xs'>PNG, JPG jusqu'à 10MB</p>
				</div>
			</label>
			{dragActive && (
				<div
					className='absolute w-full h-full top-0 right-0 left-0 bottom-0 bg-black z-10'
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					draggable
				></div>
			)}
		</div>
	);
}
