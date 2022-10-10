import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

export default API;

// http://localhost:5000/
// https://karwan-api.herokuapp.com
