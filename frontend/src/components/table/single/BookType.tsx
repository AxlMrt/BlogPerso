import { UseFormRegister } from 'react-hook-form';
import { IBook } from '../../../app/types';

export default function BookType({
	type,
	updating,
	register,
}: {
	type: string;
	updating: boolean;
	register: UseFormRegister<IBook>;
}) {
	return (
		<td className='px-6 py-4'>
			{updating ? (
				<input
					type='text'
					className='bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1'
					placeholder={type}
					form='table_form'
					{...register('type', {
						setValueAs: (x: string) => (x ? x : type),
					})}
				/>
			) : (
				type
			)}
		</td>
	);
}
