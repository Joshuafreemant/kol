import axios from 'axios';
export const apiInstance = axios.create({
	// Configuration
	// baseURL: "http://localhost:3000/api",
	baseURL: "https://kol-fvx7g3n9a-joshuafreemant.vercel.app/api",

    withCredentials: true,
	headers: {
		Accept: 'application/json',
	},
});