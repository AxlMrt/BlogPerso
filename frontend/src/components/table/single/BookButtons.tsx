import { Dispatch, SetStateAction } from "react";

export default function BookButtons({
	updating,
	setUpdating,
	handleDelete,
}: {
	updating: boolean;
  setUpdating: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void
}) {
	return (
		<td className='px-6 py-4'>
			{!updating ? (
				<button
					className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
					onClick={() => setUpdating(!updating)}
				>
					Modifier
				</button>
			) : (
				<div className='flex gap-3'>
					<button type="submit" form="table_form">
						<svg
							xmlns='http://www.w3.org/2000/svg'
							x='0px'
							y='0px'
							width='25'
							height='25'
							viewBox='0 0 48 48'
						>
							<path
								fill='#c8e6c9'
								d='M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z'
							></path>
							<path
								fill='#4caf50'
								d='M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z'
							></path>
						</svg>
					</button>
					<button onClick={handleDelete}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							x='0px'
							y='0px'
							width='16'
							height='16'
							viewBox='0,0,256,256'
						>
							<g
								fill='#c90000'
								fillRule='nonzero'
								stroke='none'
								strokeWidth='1'
								strokeLinecap='butt'
								strokeLinejoin='miter'
								strokeMiterlimit='10'
								strokeDasharray=''
								strokeDashoffset='0'
								fontFamily='none'
								fontWeight='none'
								fontSize='none'
								textAnchor='none'
							>
								<g transform='scale(16,16)'>
									<path d='M6.49609,1c-0.82031,0 -1.49609,0.67578 -1.49609,1.49609v0.50391h-3v1h1v8.5c0,0.82813 0.67188,1.5 1.5,1.5h6c0.82813,0 1.5,-0.67187 1.5,-1.5v-8.5h1v-1h-3v-0.50391c0,-0.82031 -0.67578,-1.49609 -1.49609,-1.49609zM6.49609,2h2.00781c0.28125,0 0.49609,0.21484 0.49609,0.49609v0.50391h-3v-0.50391c0,-0.28125 0.21484,-0.49609 0.49609,-0.49609zM5,5h1v7h-1zM7,5h1v7h-1zM9,5h1v7h-1z'></path>
								</g>
							</g>
						</svg>
					</button>
				</div>
			)}
		</td>
	);
}
