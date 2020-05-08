import axios from 'axios';

const httpUploadFile = axios.create({
	baseURL: 'http://localhost:3001/api',
	headers: {
		'Content-type': 'multipart/form-data; boundary=1',
	},
});

export default httpUploadFile;
