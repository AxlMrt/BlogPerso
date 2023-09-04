import { ChangeEvent, useEffect, useState } from "react";
import Search from "../components/table/Search";
import Table from "../components/table/Table";
import TableUpdate from "../components/table_update/TableUpdate";
import { IBook } from "../app/types";
import { useAppSelector } from "../app/store/configureStore";
import { useGetUserBookQuery } from "../app/store/api/userQueryApi";
import {
  BaseQueryArg,
  BaseQueryFn,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import AddBookModal from "../components/modal/AddBookModal";
import TableSkeleton from "../components/skeleton/TableSkeleton";
import InputSkeleton from "../components/skeleton/InputSkeleton";
import PaginationSkeleton from "../components/skeleton/PaginationSkeletont";

export default function BooksPage() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearchField] = useState<string>("");
  const [order, setOrder] = useState<string>("desc");
  const [field, setField] = useState<string>("createdAt");
  const [type, setType] = useState<string>("");
  const [tableHeadFilterVisible, setTableHeadFilterVisible] =
    useState<boolean>(false);

  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, refetch } = useGetUserBookQuery<
    BaseQueryArg<BaseQueryFn>
  >({
    id: user!["id"],
    page,
    search,
    field,
    order,
    type,
  });

  const [bookToUpdate, setBookToUpdate] = useState<IBook[]>([]);
  const [updateFields, setUpdateFields] = useState<boolean>(false);

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>, value: IBook) => {
    setBookToUpdate([...bookToUpdate, value]);
    !e.target.checked &&
      setBookToUpdate(
        bookToUpdate.filter((book: IBook) => book.id !== value.id),
      );
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <section
      className="bg-gray-100 dark:bg-gray-900 h-screen"
      onClick={() => setTableHeadFilterVisible(false)}
    >
      {isLoading ? (
        <div className="h-full w-5/6 m-auto mt-32">
          <InputSkeleton />
          <PaginationSkeleton />
          <TableSkeleton />
        </div>
      ) : (
        <div className="h-full w-5/6 m-auto mt-32">
          <Search
            setSearchField={setSearchField}
            placeholder={"Rechercher un livre"}
          />
          <TableUpdate
            bookToUpdate={bookToUpdate}
            updateFields={updateFields}
            data={data}
            page={page}
            setPage={setPage}
            refetch={refetch}
          />
          <Table
            books={data.books}
            field={field}
            handleCheckBox={handleCheckBox}
            order={order}
            type={type}
            tableHeadFilterVisible={tableHeadFilterVisible}
            updateFields={updateFields}
            setField={setField}
            setOrder={setOrder}
            setSearchField={setSearchField}
            setTableHeadFilterVisible={setTableHeadFilterVisible}
            setType={setType}
            setUpdateFields={setUpdateFields}
          />
        </div>
      )}

      <AddBookModal refetch={refetch} />
    </section>
  );
}
