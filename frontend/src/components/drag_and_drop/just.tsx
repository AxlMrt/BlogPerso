import React from 'react'

export default function just() {
  return (
    <div onDragEnter={handleDrag} className='relative'>
			<label className='block text-sm font-medium dark:text-white'>Image</label>
			<div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
				<div className='space-y-1 text-center'>
					{file ? (
						<img src={URL.createObjectURL(file)} alt='' />
					) : (
						<Svg
							icon={imageIcon.icon}
							iconClass={imageIcon.class}
							viewBox={imageIcon.viewBox}
						/>
					)}

					<div className='flex text-sm text-gray-600'>
						<label
							htmlFor='file-upload'
							className='relative cursor-pointer font-medium text-primary-500 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
						>
							<span className=''>Télécharger un fichier</span>
							<input
								id='file-upload'
								type='file'
								className='sr-only'
								{...register('photo', {
									onChange: (e) => handleChange(e)),
									setValueAs: (x: string) => (x ? x : photo),
								})}
							/>
						</label>
						<p className='pl-1 dark:text-white'>ou glisser-déposer</p>
					</div>
					<p className='text-xs dark:text-white'>PNG, JPG, GIF jusqu'à 10MB</p>
				</div>
			</div>
				{dragActive && (
					<div
						className='absolute w-full h-full top-0 right-0 left-0 bottom-0'
						onDragEnter={handleDrag}
						onDragLeave={handleDrag}
						onDragOver={handleDrag}
						onDrop={handleDrop}
					></div>
				)}
		</div>
        
  )
}



<div>
  
            <div className="d-flex justify-content-center align-content-center file-upload">
                <div>
                    <p className="book-upload">Upload a book to start swap</p>
                    <p className="save-cost">save cost of buying new books by book swapping</p>
                    <div className="file-upload-area m-10" onDragOver={handleDragOver} onDrop={handleDrop} >
                        <div className="card-body d-flex align-items-center justify-content-center m-2 scan-div" style={{ minHeight: "372px" }} draggable = "true" onDragStart={handleDragStart}>
                            <div className='file-upload-div'>
                            <ul>
                                {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                                <h5 class="card-title scan-book">Tap here to scan a book</h5>
                                <div className="d-flex align-items-center justify-content-center" >
                                  <h5 className="isbn">ISBN format</h5>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>