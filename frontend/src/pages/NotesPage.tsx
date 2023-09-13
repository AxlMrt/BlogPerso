import { useAppSelector } from "../app/store/configureStore"
import { BsPencilFill } from "react-icons/bs";
import { BiSolidMessageAltEdit } from "react-icons/bi"
import { useAddNewNoteMutation } from "../app/store/api/notesApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
export default function NotesPages() {
  const { user } = useAppSelector((state) => state.auth);
  const [addNewNote, { isSuccess }] = useAddNewNoteMutation();

  const handleNewNote = async () => {
    try {
      await addNewNote({ title: "New note", note: "De quoi souhaitez-vous vous souvenir ?", userMail: user!['email'] });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isSuccess)
      toast.success('Votre nouvelle note a été créée !');
  })

  return (
    <section className="min-h-screen mx-auto container py-20 px-6">
      <div className="flex items-center py-6">
        <BiSolidMessageAltEdit size={40} className={'cursor-pointer'} onClick={() => handleNewNote()} />
        <p>Une idée ? Notez la !</p>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          user!["notes"].map((note: { title: string, note: string, color: string, createdAt: string }) => {
            const created = new Date(note.createdAt).toLocaleDateString();
            return (

              <div className={`w-full h-64 flex flex-col justify-between rounded-lg mb-6 py-5 px-4 `} style={{ backgroundColor: `${note.color}` }}>
                <div>
                  <h4 className="text-gray-800 font-bold mb-3">{note.title}</h4>
                  <p className="text-gray-800 text-sm">{note.note}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between text-gray-800">
                    <p className="text-sm">{created}</p>
                    <button className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-pink-300   focus:ring-black"
                      aria-label="edit note" role="button">
                      <BsPencilFill />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}
