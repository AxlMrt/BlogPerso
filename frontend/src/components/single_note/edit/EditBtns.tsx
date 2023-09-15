import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPencilFill } from "react-icons/bs";

interface Props {
  id: string;
  handleDelete: () => void;
  handleChange: () => void;
}

export default function EditBtns({ handleDelete, handleChange }: Props) {

  return (
    <div className="flex items-center gap-3">
      <button className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-pink-300   focus:ring-black"
        aria-label="delete note" role="button" onClick={handleDelete}>
        <RiDeleteBin6Line />
      </button>

      <button
        className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-pink-300   focus:ring-black"
        aria-label="edit note"
        role="button"
        onClick={handleChange}
      >
        <BsPencilFill />
      </button>
    </div>
  )
}
