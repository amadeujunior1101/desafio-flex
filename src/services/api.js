import axios from "axios";

const usersApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const apiDivida = axios.create({
  baseURL:
    "https://provadev.xlab.digital/api/v1/divida/5ca56b25c4cc0e390083e71d?uuid=4fc7ccbd-97d0-4a84-a06e-a436aee00403",
});

export { usersApi, apiDivida };
