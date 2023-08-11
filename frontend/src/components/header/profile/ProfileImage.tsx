import { Dispatch, SetStateAction, MouseEvent } from 'react';
import ProfileDropDown from './ProfileDropDown';
import { useAppSelector } from '../../../app/store/configureStore';

interface Props {
	profileBar: boolean;
	setProfilebar: Dispatch<SetStateAction<boolean>>;
}

export default function ProfileImage({
	profileBar,
	setProfilebar,
}: Props) {
	const { user } = useAppSelector((state) => state.auth);

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setProfilebar(!profileBar);
	}

	if (user) {
		const PF = `${process.env.BASE_IMG}/uploads/`;

		return (
			<div className='relative'>
				<button
					type='button'
					className='relative flex rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
					id='user-menu-button'
					aria-expanded='false'
					aria-haspopup='true'
					onClick={(e) => handleClick(e)}
				>
					<span className='absolute -inset-1.5'></span>
					<span className='sr-only'>Open user menu</span>
					<div className='h-7 w-7 rounded-full overflow-hidden md:h-8 md:w-8 bg-gray-800 dark:bg-white'>
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
