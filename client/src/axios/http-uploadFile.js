import axios from 'axios';

const httpUploadFile = axios.create({
	baseURL: 'http://localhost:3001/api',
	headers: {
		'Content-type': 'multipart/form-data',
	},
});

httpUploadFile.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers['Authorization'] = 'Bearer ' + token;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default httpUploadFile;
