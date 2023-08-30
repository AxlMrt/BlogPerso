import { Dispatch, SetStateAction } from "react";
import { LiaEdit } from "react-icons/lia";

interface Props {
  updateFields: boolean;
  setUpdateFields: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateBtn({ updateFields, setUpdateFields }: Props) {
  return (
    <button type="button" onClick={() => setUpdateFields(!updateFields)}>
      <LiaEdit size={20} />
    </button>
  );
}
