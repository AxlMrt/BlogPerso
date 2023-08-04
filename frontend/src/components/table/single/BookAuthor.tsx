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
		<td className='px-6 py-4'>
			{updating ? (
				<input
					type='text'
					className='bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1'
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
