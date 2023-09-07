import { AiFillStar } from "react-icons/ai"


export default function Stars() {
  return (
    <div className=' flex items-center justify-center py-6 lg:justify-start lg:py-0'>
      {
        [...Array(5)].map((_star, index) => {
            return (
              <AiFillStar key={index} className={'text-yellow-500'}/>
          )
        })
      }
    </div>
  )
}
