/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
	type: 'email' | 'password' | 'text' | string;
	holder: string;
	register: any;
	name: string;
	labelText: string;
	labelFor: string;
	id: string;
	isRequired: boolean;
}

export default function Input({
	type,
	holder,
	register,
	name,
	labelText,
	labelFor,
	id,
	isRequired,
}: Props) {
	return (
		<div>
			<label
				htmlFor={labelFor}
				className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
			>
				{labelText}
			</label>
			<input
				type={type}
				id={id}
				className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				placeholder={holder}
				{...register(name)}
				required={isRequired}
			/>
		</div>
	);
}
