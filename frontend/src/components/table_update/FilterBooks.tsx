import { useAppSelector } from "../../app/store/configureStore";

interface Props {
  filtersVisible: boolean;
}

export default function FilterBooks({ filtersVisible }: Props) {
  const { types } = useAppSelector((state) => state.userQuery);

  return (
		<div
			className={`${filtersVisible ? 'block' : 'hidden'} absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1`}
		>
				<div>
					{types.map(({ type }, index) => {
						if (type)
							return (
								<div
									className='text-gray-600 bg-white hover:bg-gray-200 hover:text-gray-800 block rounded-md px-2 py-1 text-sm font-medium cursor-pointer'
									key={index}
								>
									{type}
								</div>
							);
					})}
				</div>
		</div>
	);
}

