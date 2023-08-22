import { ChangeEvent } from "react";

interface Props {
	handleUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
	updateFields: boolean;
}

export default function BookCheckBox({ handleUpdate, updateFields }: Props) {
  return (
		<td className='w-4 p-4'>
			<div className='flex items-center'>
				<input
					type='checkbox'
					className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
					onChange={handleUpdate}
					disabled={!updateFields}
				/>
				<label className='sr-only'>
					checkbox
				</label>
			</div>
		</td>
	);
}
