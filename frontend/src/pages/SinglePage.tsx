import { useLocation } from 'react-router-dom';
import bestsSellers from '../../ScrapBooks/bestseller.json';
import Stars from '../components/stars/Stars';
import Resume from '../components/scrap_book/Resume';
import Details from '../components/scrap_book/Details';
import Leading from '../components/scrap_book/Leading';
import AddBookModal from '../components/modal/AddBookModal';

export default function SinglePage(){
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const decoded_path = decodeURIComponent(path);

  const book = bestsSellers.filter((book) => book.title === decoded_path)[0];
    return (
    <section className='bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen flex justify-center items-center'>
      <div className='w-4/6 py-12 rounded-md lg:flex lg:py-0'>
        <div className='flex justify-center items-center lg:h-full lg:w-1/2 lg:block'>
          <img src={`${book.photo}`} className='min-h-full rounded-md shadow-lg' alt=''/>
        </div>
        <div className='w-full flex flex-col items-left justify-between lg:px-6'>
          <Stars />
          <Leading author={book.author} title={book.title}/>        
          <Resume description={book.description} />
          <Details publisher={book.publisher} page={book.page} year={book.year} />
        </div>
      </div>
      <AddBookModal />
    </section>
  )
}
