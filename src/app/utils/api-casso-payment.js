const axios = require("axios");
// const queryString = require("query-string");
const { CASSO_URL } = require("../constants/global");
const { CASSO_API_KEY } = require("../constants/payment");

const axiosClient = axios.create({
    baseURL: CASSO_URL,
    headers: {
        "content-type": "application/json",
        "Authorization": `Apikey ${CASSO_API_KEY}`,
    },
    // paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data;
        return response;
    },
    (error) => {
        throw error;
    }
);

module.exports = { axiosClient };
