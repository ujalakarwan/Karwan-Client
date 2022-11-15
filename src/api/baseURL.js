import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export default API;

// LOCAL HOST: http://localhost:5000/
// HEROKU: https://karwan-api.herokuapp.com/
// AMAZON AWS http://ec2-18-183-26-143.ap-northeast-1.compute.amazonaws.com:5000/
