import { Dispatch, SetStateAction, MouseEvent } from "react";
import { IBook } from "../../../app/types";
import UpdateBtn from "../../buttons/update_btn/UpdateBtn";
import TableHeaderCell from "./TableHeaderCell";

interface Props {
  books: IBook[];
  field: string;
  order: string;
  type: string;
  tableHeadFilterVisible: boolean;
  updateFields: boolean;
  setSearchField: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
  setTableHeadFilterVisible: Dispatch<SetStateAction<boolean>>;
  setUpdateFields: Dispatch<SetStateAction<boolean>>;
  changeSort: (e: MouseEvent<HTMLDivElement>, key: string) => void;
}

export default function TableHead({
  books,
  field,
  order,
  type,
  tableHeadFilterVisible,
  updateFields,
  setSearchField,
  setType,
  setTableHeadFilterVisible,
  setUpdateFields,
  changeSort,
}: Props) {
  const headers: { key: string; label: string }[] = [
    { key: "year", label: "Année" },
    { key: "title", label: "Titre" },
    { key: "author", label: "Auteur" },
    { key: "isRead", label: "Status" },
    { key: "type", label: "Genre" },
  ];
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-200  dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className={`${books.length ? "block" : "hidden"} p-4`}>
          <UpdateBtn
            updateFields={updateFields}
            setUpdateFields={setUpdateFields}
          />
        </th>
        {headers.map((row, index) => {
          return (
            <TableHeaderCell
              field={field}
              isBookInList={books.length > 0}
              order={order}
              type={type}
              tableHeadFilterVisible={tableHeadFilterVisible}
              row={row}
              setSearchField={setSearchField}
              setType={setType}
              setTableHeadFilterVisible={setTableHeadFilterVisible}
              changeSort={changeSort}
              key={index}
            />
          );
        })}
      </tr>
    </thead>
  );
}
