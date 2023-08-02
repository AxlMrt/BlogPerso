import { Dispatch, SetStateAction } from 'react'
import ProfileDropDown from './ProfileDropDown';
import ProfileImage from './ProfileImage';

export default function Profile({
	profileBar,
	setProfilebar,
}: {
	profileBar: boolean;
	setProfilebar: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<div className='relative ml-3'>
			<ProfileImage profileBar={profileBar} setProfilebar={setProfilebar} />
			<ProfileDropDown profileBar={profileBar} setProfilebar={setProfilebar} />
		</div>
	);
}
