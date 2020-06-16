import React, { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import superagent from 'superagent';

import { getToken } from '../services/superagent';
import { endpoint } from '../store/storeConfig';

export const FileUpload: React.FC = () => {
	const [position, setPosition] = useState(0);
	const [error, setError] = useState('');

	const onDrop = useCallback(async acceptedFiles => {
		const token = getToken();
		const file: FileWithPath = acceptedFiles[0];
		const formData = new FormData();
		formData.append('players', file);
		const response = await superagent
			.post(`${endpoint}players/${position}`)
			.attach('players', acceptedFiles[0])
			.set('Authorization', 'Bearer ' + token)
		if (!response || !response.ok) {
			setError('Something went wrong, please try again');
		}
	}, [position]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
			{
				!!error ?
					<p>{error}</p> :
					''
			}
			<div>
				<form action="">
					<input type="radio" name="position" id="qb" value="0" checked={position === 0} onChange={() => setPosition(0)} />
					<label htmlFor="qb">QB</label>
					<input type="radio" name="position" id="rb" value="1" checked={position === 1} onChange={() => setPosition(1)} />
					<label htmlFor="rb">RB</label>
					<input type="radio" name="position" id="wr" value="2" checked={position === 2} onChange={() => setPosition(2)} />
					<label htmlFor="wr">WR</label>
					<input type="radio" name="position" id="te" value="3" checked={position === 3} onChange={() => setPosition(3)} />
					<label htmlFor="te">TE</label>
					<input type="radio" name="position" id="flex" value="4" checked={position === 4} onChange={() => setPosition(4)} />
					<label htmlFor="flex">FLEX</label>
				</form>
			</div>
		</div>
	)
}