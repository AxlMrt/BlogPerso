import { INote, IUser } from "../../app/types";
import { toast } from "react-toastify";

import { useDeleteNoteMutation, useUpdateNoteMutation } from "../../app/store/api/notesApi";
import { useEffect, useState } from "react";
import EditBtns from "./edit/EditBtns";
interface Props {
  note: INote;
  user: IUser | null;
  refetch?: () => void;
}

export default function Single({ note, user, refetch }: Props) {
  const [title, setTitle] = useState(note.title);
  const [noteValue, setNoteValue] = useState(note.note);

  const [deleteNote, { isSuccess }] = useDeleteNoteMutation();
  const [changeNote, { ...others }] = useUpdateNoteMutation();
  const created = new Date(note.createdAt).toLocaleDateString();

  const handleDelete = async () => {
    try {
      await deleteNote({ userId: user!.id, id: note.id });
    } catch (error) {
      toast.error("La note n'a pas pu être supprimée.");
    }
  }

  const handleChange = async () => {
    try {
      const checkTitle = title === "" ? "Nouvelle note" : title;
      await changeNote({ id: note.id, userId: user!.id, title: checkTitle, note: noteValue });
    } catch (error) {
      console.log("Went wrong");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      if (refetch) refetch();
      toast.success("Note supprimée !");
    }

    if (others.isSuccess) {
      if (refetch) refetch();
      toast.success('Note modifiée !');
    }
  }, [refetch, toast, isSuccess, others.isSuccess]);

  return (
    <div
      className={`w-full h-64 flex flex-col justify-between rounded-lg mb-6 py-5 px-4 shadow-md`}
      style={{ backgroundColor: `${note.color}` }}
    >
      <div>
        <input className="text-gray-800 font-bold mb-3 bg-inherit outline-none" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="w-full h-full text-gray-800 text-sm bg-inherit outline-none" defaultValue={noteValue} onChange={(e) => setNoteValue(e.target.value)}></textarea>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800">
          <p className="text-sm">{created}</p>
          <EditBtns id={note.id} handleDelete={handleDelete} handleChange={handleChange} />
        </div>
      </div>
    </div>

  )
}
