import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  handleDelete: () => void;
}

export default function DeleteBtn({ handleDelete }: Props) {
  return (
    <button onClick={handleDelete}>
      <RiDeleteBin6Line />
    </button>
  );
}
