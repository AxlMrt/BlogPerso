import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";

interface Props {
  placeholder: string;
  setSearchField: Dispatch<SetStateAction<string>>;
}

export default function Search({ placeholder, setSearchField }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  return (
    <div
      className="flex flex-col items-left justify-between pb-1 md:flex-row md:items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <label className="sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <PiMagnifyingGlassBold className={"dark:text-white"} />
        </div>
        <input
          type="text"
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-76 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-100 dark:focus:border-gray-100 outline-none"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
