import axios from "axios";

const API = axios.create({ baseURL: "https://karwan-api.herokuapp.com" });

export default API;

// http://localhost:5000/
// https://karwan-api.herokuapp.com
