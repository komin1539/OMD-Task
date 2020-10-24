import axios from "axios"

let baseURL = "https://evaluation.omd.ru/test"

export const http = axios.create({
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken',
    baseURL: baseURL,
});