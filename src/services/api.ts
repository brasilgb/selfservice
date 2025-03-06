import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const apios = axios.create({
//   baseURL: 'http://api.gruposolar.com.br:8000/api/',
  // baseURL: "http://172.16.1.67/api/",
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'Application/json',
  },
});

export default apios;
