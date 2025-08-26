import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://95jjd81alh.execute-api.us-east-1.amazonaws.com",
});
