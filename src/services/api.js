import axios from "axios";

const usersApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const apiDivida = axios.create({
  baseURL:
    "https://provadev.xlab.digital/api/v1",
});

export { usersApi, apiDivida };
