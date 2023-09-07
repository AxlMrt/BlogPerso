import { useState } from "react";

interface Props {
  description: string;
}

export default function Resume({ description }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='py-6 lg:py-3'>
      <h4 className='py-4 underline underline-offset-4'>Résumé</h4>
      <div className='w-full max-h-20 overflow-y-auto mb-5' >
        <span className={`${isVisible ? '' : 'line-clamp-3'}`}>        
          {
            description
          }
        </span>
      </div>
      <button 
        type="button" 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
          font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
          focus:outline-none dark:focus:ring-blue-800"
        onClick={() => setIsVisible(!isVisible)}
      >
        Lire { isVisible ? 'moins..' : 'plus..'}
      </button>
    </div>
  )
}
