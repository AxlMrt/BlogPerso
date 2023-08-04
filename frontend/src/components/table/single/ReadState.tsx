import { UseFormRegister } from 'react-hook-form';
import { IBook, IsBookRead } from '../../../app/types';

export default function ReadState({
	isRead,
	updating,
	register,
}: {
	isRead: string;
	updating: boolean;
	register: UseFormRegister<IBook>;
}) {
	const readingState: IsBookRead = {
		NOT_READ: {
			color: 'bg-red-600',
			text: 'Non lu',
		},
		IN_PROGRESS: {
			color: 'bg-orange-400',
			text: 'En cours',
		},
		IS_READ: {
			color: 'bg-green-500',
			text: 'Lu',
		},
	};
	return (
		<td className='px-6 py-4'>
			<div className='flex items-center'>
				<div
					className={`h-2.5 w-2.5 rounded-full ${
						readingState[isRead as keyof IsBookRead].color
					} mr-2`}
				></div>{' '}
				{updating ? (
					<select id='' form='table_form' {...register('isRead')}>
						<option defaultValue={isRead} value={isRead} hidden>
							{readingState[isRead as keyof IsBookRead].text}
						</option>
						<option value='NOT_READ'>Non lu</option>
						<option value='IN_PROGRESS'>En cours</option>
						<option value='IS_READ'>Lu</option>
					</select>
				) : (
					readingState[isRead as keyof IsBookRead].text
				)}
			</div>
		</td>
	);
}
