import axios from 'axios';

const httpUploadFile = axios.create({
	baseURL: 'http://localhost:3001/api',
	headers: {},
});

export default httpUploadFile;
