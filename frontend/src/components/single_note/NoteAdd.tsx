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
      await addNewNote({ title: "Nouvelle note", note: "De quoi souhaitez-vous vous souvenir ?", userMail: user!['email'] });
    } catch (error) {
      toast.error("La note n'a pas pu être créée.");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      if (refetch) refetch();

      toast.success('Note ajoutée !');
    }
  }, [isSuccess, refetch, toast]);

  return (
    <div className="fixed bottom-0 right-0 pb-6 text-gray-800 dark:text-gray-400">
      <IoIosAddCircle size={60} className={'cursor-pointer'} onClick={() => handleNewNote()} />
    </div>
  )
}
