import { useNavigate } from 'react-router-dom';
import bestsSellers from '../../../ScrapBooks/bestseller.json';
import { RiQuillPenFill } from 'react-icons/ri';

export default function Advert() {
  const navigate = useNavigate();
  const actualDate = new Date;
  const handleNav = (title: string) => {
    navigate(`/book/${title}`)
  } 

  return (
    <div className="flex flex-col items-center ">
      <div className='py-6 text-center uppercase'>
        <h3 className="text-gray-700 text-2xl font-bold dark:text-white">
          Découvrez Votre Prochain Livre
        </h3>
        <span className='text-sm tracking-wide'>BESTS SELLERS { actualDate.getFullYear() }</span>
      </div>
    <div className="flex space-x-4 overflow-x-scroll justify-center items-center w-full" >
      {
        bestsSellers.map((book, index) => {
          return (
       <div
        className="relative flex flex-col justify-between  bg-white bg-center shadow-md rounded-3xl  bg-contain bg-no-repeat text-gray-800  overflow-hidden cursor-pointer min-w-full w-64 h-64 my-2 md:min-w-0"
        style={{ backgroundImage: `url('${book.photo}')`, }}
        key={index}
        onClick={() => handleNav(book.title)}
       >
        <div className="absolute bg-gray-800 opacity-50 inset-0 z-0"></div>
        <div className="relative flex flex-row items-end  h-72 w-full ">
          <div className="p-6 rounded-lg  flex flex-col w-full z-10 ">
            <h4 className="mt-1 text-white text-xl font-semibold  leading-tight truncate">
              {book.title}
            </h4>
            <div className="flex justify-between items-center ">
              <div className="flex flex-col">
                <h2 className="text-sm flex items-center text-gray-300 font-normal">
                 <RiQuillPenFill />
                 {book.author}
                </h2>
              </div>
            </div> 
          </div>
        </div>
      </div> 
          )
        })
      }
      </div>
    </div>
  );
}
