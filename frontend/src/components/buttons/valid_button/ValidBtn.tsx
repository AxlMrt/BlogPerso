import { BsFillCheckSquareFill } from 'react-icons/bs'

export default function ValidBtn() {
  return (
		<button type='submit' form='table_form'>
			<BsFillCheckSquareFill className={'text-green-600'} />
		</button>
	);
}
