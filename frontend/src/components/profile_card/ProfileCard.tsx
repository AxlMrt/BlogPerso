import { GoMail } from 'react-icons/go';
import { IBook, IUser } from '../../app/types';

interface Props {
  currentUser: IUser
}

export default function ProfileCard({ currentUser }: Props) {
  const books: IBook[] = currentUser!.books
  const PF = `${process.env.BASE_IMG}/uploads`;

  const readBooks: number = books.filter((book) => book.isRead === 'IS_READ').length;
  const notReadBooks: number = books.filter((book) => book.isRead === 'NOT_READ').length;
  return (
		<div className='bg-white dark:bg-gray-800 dark:text-white shadow rounded-lg p-10'>
			<div className='flex flex-col gap-1 text-center items-center'>
				<img
					className='h-32 w-32 p-2 rounded-full shadow mb-4'
					src={`${PF}/${currentUser?.photo}`}
					alt=''
				/>
				<p className='font-semibold'>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
				<div className='text-sm leading-normal text-gray-400 flex justify-center items-center gap-2'>
					<GoMail />
					{currentUser?.email}
				</div>
			</div>
			<div className='flex justify-center items-center gap-2 my-3'>
				<div className='font-semibold text-center mx-4'>
					<p className='dark:text-white'>{books.length}</p>
					<span className='text-gray-400'>Livres</span>
				</div>
				<div className='font-semibold text-center mx-4'>
					<p className='dark:text-white'>{readBooks}</p>
					<span className='text-gray-400'>Lus</span>
				</div>
				<div className='font-semibold text-center mx-4'>
					<p className='dark:text-white'>{notReadBooks}</p>
					<span className='text-gray-400'>Non Lus</span>
				</div>
			</div>
		</div>
	);
}
