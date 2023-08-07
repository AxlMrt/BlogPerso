/* eslint-disable no-inner-declarations */
/* eslint-disable react-hooks/rules-of-hooks */
import { Dispatch, SetStateAction } from 'react';

export default function ProfileImage({
	profileBar,
	setProfilebar,
}: {
	profileBar: boolean;
	setProfilebar: Dispatch<SetStateAction<boolean>>;
}) {
	const currentUser = JSON.parse(localStorage.getItem('user')!);

	if (currentUser) {
		const PF = `${process.env.BASE_IMG}/uploads/`;

		return (
			<div>
				<button
					type='button'
					className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
					id='user-menu-button'
					aria-expanded='false'
					aria-haspopup='true'
					onClick={() => setProfilebar(!profileBar)}
				>
					<span className='absolute -inset-1.5'></span>
					<span className='sr-only'>Open user menu</span>
					<img
						className='h-8 w-8 rounded-full'
						src={PF + currentUser.photo}
						alt=''
					/>
				</button>
			</div>
		);
	}
}
