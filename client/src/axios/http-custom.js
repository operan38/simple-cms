import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/custom",
  headers: {
    "Content-type": "application/json"
  }
});