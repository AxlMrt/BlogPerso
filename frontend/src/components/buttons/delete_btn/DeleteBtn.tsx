import { RiDeleteBin6Fill } from 'react-icons/ri';

interface Props {
	handleDelete: () => void;
}

export default function DeleteBtn({ handleDelete }: Props) {
  return (
		<button onClick={handleDelete}>
			<RiDeleteBin6Fill className={'text-red-600'} size={20} />
		</button>
	);
}
