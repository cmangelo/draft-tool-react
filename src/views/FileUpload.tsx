import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export const FileUpload: React.FC = () => {
	const onDrop = useCallback(acceptedFiles => {
		console.log(acceptedFiles)
	}, []);

	const { getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

	return (
		<div className="FileUpload">
			<div className="dropzone" {...getRootProps()}>
				<input {...getInputProps()} />
				{
					isDragActive ?
						<p>Drop the files here...</p> :
						<p>Drag n drop some files here, or click to select files</p>
				}
			</div>
			<div>
				<form action="">
					<input type="radio" name="position" id="qb" value="0" checked/>
					<label htmlFor="qb">QB</label>
					<input type="radio" name="position" id="rb" value="1"/>
					<label htmlFor="rb">RB</label>
					<input type="radio" name="position" id="wr" value="2"/>
					<label htmlFor="wr">WR</label>
					<input type="radio" name="position" id="te" value="3"/>
					<label htmlFor="te">TE</label>
					<input type="radio" name="position" id="flex" value="4"/>
					<label htmlFor="flex">FLEX</label>
				</form>
			</div>
		</div>
	)
}