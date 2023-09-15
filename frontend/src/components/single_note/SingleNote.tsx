import { INote, IUser } from "../../app/types";
import Single from "./Single";

interface Props {
  notes: INote[];
  user: IUser | null;
  refetch?: () => void;
}

export default function SingleNote({ notes, user, refetch }: Props) {

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {
        notes.map((note: INote, index: number) => {
          return (
            <Single note={note} user={user} refetch={refetch} key={index} />
          )
        })
      }
    </div>
  )
}
