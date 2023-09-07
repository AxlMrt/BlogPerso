

interface Props {
  author: string;
  title: string;
}

export default function Leading({ author, title }: Props) {

  return (
    <div className=' text-center lg:text-left md:pb-6'>
            <p className='text-sm text-gray-700 dark:text-gray-400'>{ author }</p>
            <h3 className='text-2xl font-bold tracking-widest'> 
              {
                title
              }
            </h3>
    </div>
  )
}
