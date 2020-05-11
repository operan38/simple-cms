import axios from 'axios';

const httpAPI = axios.create({
	baseURL: 'http://localhost:3001/api',
	headers: {
		'Content-type': 'application/json',
	},
});

httpAPI.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers['authorization'] = token;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default httpAPI;
