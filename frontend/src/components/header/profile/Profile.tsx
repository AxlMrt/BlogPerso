import { Dispatch, SetStateAction } from 'react'
import ProfileImage from './ProfileImage';

export default function Profile({
	profileBar,
	setProfilebar,
}: {
	profileBar: boolean;
	setProfilebar: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<div className='relative ml-3'
			onClick={(e) => e.stopPropagation()}
		>
			<ProfileImage profileBar={profileBar} setProfilebar={setProfilebar} />
		</div>
	);
}
