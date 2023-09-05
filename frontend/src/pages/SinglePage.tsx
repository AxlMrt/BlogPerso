import { useLocation } from 'react-router-dom';
import bestsSellers from '../../ScrapBooks/bestseller.json';

export default function SinglePage(){
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const decoded_path = decodeURIComponent(path);

  const book = bestsSellers.filter((book) => book.title === decoded_path)[0];

  return (
    <div className='h-screen'>
      <div className='w-full text-center'>
        <h3>
          {
            book.title
          }
        </h3>
      </div>
    </div>
  )
}
