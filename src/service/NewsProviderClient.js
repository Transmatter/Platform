import axios from 'axios';

const newsProviderClient = axios.create({
    baseURL: "http://52.230.104.188:5000",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});
export default newsProviderClient;