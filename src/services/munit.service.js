import { axiosInstance } from "../lib/axios";

export const getAllMunit = (callback) => {
    axiosInstance
        .get("/munit")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getMunitById = (id, callback) => {
    axiosInstance
        .get(`/munit/${id}`)
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
