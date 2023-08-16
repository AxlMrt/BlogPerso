import { Link } from 'react-router-dom';

interface Props {
	label: string;
	dest: string;
	buttonLabel: string;
}

export default function LogsFooter({ label, dest, buttonLabel }: Props) {
  return (
		<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
      {label}?{' '}
			<Link
				to={dest}
				className='font-medium text-primary-600 hover:underline dark:text-primary-500'
			>
				{buttonLabel}
			</Link>
		</p>
	);
}
