import { Dispatch, SetStateAction } from "react";
import DeleteBtn from "../../buttons/delete_btn/DeleteBtn";

export default function BookButtons({
  updating,
  setUpdating,
  handleDelete,
}: {
  updating: boolean;
  setUpdating: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
}) {
  return (
    <td className="px-6 py-4">
      {!updating ? (
        <button
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => setUpdating(!updating)}
        >
          Modifier
        </button>
      ) : (
        <div className="flex gap-3">
          <button type="submit" form="table_form">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 48 48"
            >
              <path
                fill="#c8e6c9"
                d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"
              ></path>
              <path
                fill="#4caf50"
                d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"
              ></path>
            </svg>
          </button>
          <DeleteBtn handleDelete={handleDelete} />
        </div>
      )}
    </td>
  );
}
