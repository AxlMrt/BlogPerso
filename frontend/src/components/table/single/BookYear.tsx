import { UseFormRegister } from "react-hook-form";
import { IBook } from "../../../app/types";

export default function BookYear({
	year,
	updating,
	register,
}: {
	year: number;
	updating: boolean;
	register: UseFormRegister<IBook>;
}) {
	return (
		<td className='w-4 p-4'>
			<div className='flex items-center'>
				{updating ? (
					<input
						type='number'
						className='w-12'
						placeholder={year ? year.toString() : 'xxxx'}
						form='table_form'
						{...register('year', {
							setValueAs: (x: string) => (x ? parseInt(x) : year),
						})}
					/>
				) : (
					year
				)}
			</div>
		</td>
	);
}
