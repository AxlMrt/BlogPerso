import heroImg from '../../assets/hero.png';

export default function Hero() {
  return (
		<div className='mt-10 lg:mt-0'>
			<div className='flex items-center justify-center'>
				<img
					src={heroImg}
					className='w-full max-w-3xl object-cover'
					alt='Hero Illustration'
					loading='eager'
					placeholder='blur'
				/>
			</div>
		</div>
	);
}
