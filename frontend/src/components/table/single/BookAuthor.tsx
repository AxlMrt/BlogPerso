import { UseFormRegister } from "react-hook-form";
import { IBook } from "../../../app/types";

export default function BookAuthor({
	author,
	updating,
	register,
}: {
	author: string;
	updating: boolean;
	register: UseFormRegister<IBook>;
}) {
	return (
		<td className='px-6 py-4 w-32'>
			{updating ? (
				<input
					type='text'
					placeholder={author}
					form='table_form'
					{...register('author', {
						setValueAs: (x: string) => (x ? x : author),
					})}
				/>
			) : (
				author
			)}
		</td>
	);
}
