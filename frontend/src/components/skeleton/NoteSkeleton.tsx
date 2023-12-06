

export default function NoteSkeleton() {

  return (

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {
        [...Array(3)].map((_cards, index) => {
          return (
            <div
              className={`w-full h-64 flex flex-col justify-between bg-gray-200 animate-pulse rounded-lg dark:bg-gray-600 mb-6 py-5 px-4 shadow-md`}
            >
            </div>
          )
        })
      }
    </div>
  )
}
