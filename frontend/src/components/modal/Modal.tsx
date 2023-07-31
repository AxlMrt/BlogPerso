import Svg from "../svg/Svg"

export default function Modal() {

	const closeIcon = {
		icon: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
		class: 'w-5 h-5',
		viewBox: '0 0 20 20'
	}

	const closeModal = () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window as any).add_book.close();
	}

	return (
		<dialog
			id='add_book'
			className='fixed z-50 w-full max-w-full p-4 overflow-x-hidden overflow-y-auto md:p-12 h-screen max-h-full justify-center items-center bg-white bg-opacity-25 dark:bg-gray-700 dark:bg-opacity-30'
			onClick={closeModal}
		>
			<div
				className='relative w-full max-w-md max-h-full m-auto'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
					<button
						type='button'
						className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
						onClick={closeModal}
					>
						<Svg
							icon={closeIcon.icon}
							iconClass={closeIcon.class}
							viewBox={closeIcon.viewBox}
						/>
						<span className='sr-only'>Close modal</span>
					</button>
					<div className='px-6 py-6 lg:px-8'>
						<h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>
							Ajouter un livre
						</h3>
						<form className='space-y-6' action='#'>
							<div>
								<label
									htmlFor='title'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Titre
								</label>
								<input
									type='title'
									name='title'
									id='title'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
									placeholder='ex: Harry Potter'
									required
								/>
							</div>
							<div>
								<label
									htmlFor='author'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Auteur
								</label>
								<input
									type='author'
									name='author'
									id='author'
									placeholder='ex: J. K. Rowling'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
									required
								/>
							</div>
							<div>
								<label
									htmlFor='type'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Type
								</label>
								<input
									type='type'
									name='type'
									id='type'
									placeholder='ex: Roman, Fantaisie'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
								/>
							</div>
							<div>
								<label
									htmlFor='year'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Année de parution
								</label>
								<input
									type='year'
									name='year'
									id='year'
									placeholder='ex: 1997'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
								/>
							</div>
							<div>
								<label
									htmlFor='publisher'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Éditeur
								</label>
								<input
									type='publisher'
									name='publisher'
									id='publisher'
									placeholder='ex: Bloomsbury Publishing'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
								/>
							</div>

							<button
								type='submit'
								className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
							>
								Ajouter
							</button>
						</form>
					</div>
				</div>
			</div>
		</dialog>
	);
}
