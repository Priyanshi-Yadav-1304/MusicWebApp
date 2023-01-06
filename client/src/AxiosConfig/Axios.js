import axios from "axios";

const Axios = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000',
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
 })
 export default Axios;