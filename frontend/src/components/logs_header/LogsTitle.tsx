interface Props {
  title: string
}

export default function LogsTitle({ title }: Props) {
  return (
		<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
			{ title }
		</h1>
	);
}
