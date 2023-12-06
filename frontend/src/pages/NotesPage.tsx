import { useAppSelector } from "../app/store/configureStore";  
import SingleNote from "../components/single_note/SingleNote";
import NoteAdd from "../components/single_note/NoteAdd";
import { useGetUserNotesQuery } from "../app/store/api/userQueryApi";
import NoteSkeleton from "../components/skeleton/NoteSkeleton";

export default function NotesPages() {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, refetch } = useGetUserNotesQuery({ id: user!["id"] });

  return (
    <section className="min-h-screen relative mx-auto overflow-scroll py-20 px-6 bg-gray-100 dark:bg-gray-900">
      <div className="dark:text-gray-100 mb-12">
        <h3 className="text-4xl font-bold">Notes</h3>
        <p>Une idée ? Notez la !</p>
      </div>
      {
        !isLoading ? <SingleNote notes={data.notes} user={user} refetch={refetch} /> : <NoteSkeleton />
      }
      {
        !isLoading && !data.notes.length && <div className="text-center p-12 dark:text-white">
          <h3 className="text-2xl mb-2 md:text-4xl">Vous n'avez pas encore de notes !</h3>
          <p>Appuyer sur le + pour en ajouter</p>
        </div>
      }
      <NoteAdd user={user} refetch={refetch} />
    </section>
  )
}
