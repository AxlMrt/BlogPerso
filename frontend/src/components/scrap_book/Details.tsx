import { BsBuildings , BsCalendar2Heart } from "react-icons/bs";
import { TbBrandPagekit } from "react-icons/tb";

interface Props {
  publisher: string;
  page: string;
  year: string;
}

export default function Details({ publisher, page, year }: Props) {

  return (
    <ul className='flex flex-col justify-between xs:flex-row lg:justify-start gap-6 py-6 capitalize'>
      <li className='flex flex-col justify-center items-center gap-2 lg:flex-row'>
        <BsBuildings />
        { publisher.substring(publisher.indexOf(' ') + 1) }
      </li>
      <li className='flex flex-col justify-center items-center gap-2 lg:flex-row'>
        <TbBrandPagekit />
        <p>{ page } pages</p>
      </li>
      <li className='flex flex-col justify-center items-center gap-2 lg:flex-row'>
        <BsCalendar2Heart />
        <p>sortie:{' '}  
          { year.slice(-4)}
        </p>
      </li>
    </ul>
  )
}
