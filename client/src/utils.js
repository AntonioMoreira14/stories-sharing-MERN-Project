import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://stories-sharing-app.herokuapp.com"
})