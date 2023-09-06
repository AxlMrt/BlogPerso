import { useLocation } from 'react-router-dom';
import bestsSellers from '../../ScrapBooks/bestseller.json';
import { useState } from 'react';
import { TbBrandPagekit } from 'react-icons/tb';
import { BsBuildings, BsCalendar2Heart } from 'react-icons/bs';

export default function SinglePage(){
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const decoded_path = decodeURIComponent(path);

  const book = bestsSellers.filter((book) => book.title === decoded_path)[0];
  const [isVisible, setIsVisible] = useState(false);
  return (
    <section className=' bg-gray-100 dark:bg-gray-900 dark:text-gray-200 h-screen flex justify-center items-center'>
      <div className='w-5/6 bg-white shadow-md rounded-md dark:bg-gray-800 md:flex'>
        <div className='w-full h-auto flex justify-center object-fill'>
          <img src={`${book.photo}`} className='w-52 md:rounded-l-md md:w-full' alt=''/>
        </div>
        <div className='w-full flex flex-col px-6'>
          <div className='py-6 text-center md:text-left md:pb-6'>
            <p className='text-sm text-gray-800'>{ book.author }</p>
            <h3 className='text-2xl tracking-widest'> 
              {
                book.title
              }
            </h3>
          </div>
          <h4 className='py-4'>Résumé</h4>
          <div className='w-full h-52 overflow-y-auto' onClick={() => setIsVisible(!isVisible)}>
            <span className={`${isVisible ? '' : 'line-clamp-3'}`}>        
            {
              book.description
            }
            </span>
          </div>
          <div className='h-full w-full flex justify-around items-end py-6'>
            <div className='flex flex-col items-center'>
              <p>Éditeur</p>
              <BsBuildings />
              { book.publisher}
            </div>
            <div className='flex flex-col items-center'>
              <p>Pages</p>
              <TbBrandPagekit />
              <p>{ book.page }</p>
            </div>
            <div className='flex flex-col items-center'>
              Année de publication
              <BsCalendar2Heart />
              { book.year.slice(-4)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
