import { IoIosAddCircle } from 'react-icons/io';
import { useAddNewNoteMutation } from "../../app/store/api/notesApi";
import { IUser } from "../../app/types";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  user: IUser | null;
  refetch: () => void;
}

export default function NoteAdd({ user, refetch }: Props) {
  const [addNewNote, { isSuccess }] = useAddNewNoteMutation();

  const handleNewNote = async () => {
    try {
      await addNewNote({ title: "New note", note: "De quoi souhaitez-vous vous souvenir ?", userMail: user!['email'] });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      if (refetch) refetch();

      toast.success('Note ajoutée !');
    }
  }, [isSuccess, refetch, toast]);

  return (
    <div className="sticky bottom-0 float-right pb-6 text-gray-800 dark:text-gray-400">
      <IoIosAddCircle size={60} className={'cursor-pointer'} onClick={() => handleNewNote()} />
    </div>
  )
}
