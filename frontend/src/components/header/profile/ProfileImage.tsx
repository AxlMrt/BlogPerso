/* eslint-disable no-inner-declarations */
/* eslint-disable react-hooks/rules-of-hooks */
import { Dispatch, SetStateAction } from 'react';
import ProfileDropDown from './ProfileDropDown';
import { useAppSelector } from '../../../app/store/configureStore';

export default function ProfileImage({
	profileBar,
	setProfilebar,
}: {
	profileBar: boolean;
	setProfilebar: Dispatch<SetStateAction<boolean>>;
	}) {
	const { user } = useAppSelector((state) => state.auth);

	if (user) {
		const PF = `${process.env.BASE_IMG}/uploads/`;

		return (
			<div className='relative'>
				<button
					type='button'
					className='relative flex rounded-full bg-gray-800 dark:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
					id='user-menu-button'
					aria-expanded='false'
					aria-haspopup='true'
					onClick={() => setProfilebar(!profileBar)}
				>
					<span className='absolute -inset-1.5'></span>
					<span className='sr-only'>Open user menu</span>
					<div className='h-8 w-8 rounded-full overflow-hidden'>
						<img
							className='min-h-full min-w-full w-auto h-auto '
							src={PF + user.photo}
							alt=''
						/>
					</div>
				</button>
				<ProfileDropDown
					profileBar={profileBar}
					setProfilebar={setProfilebar}
				/>
			</div>
		);
	}
}
