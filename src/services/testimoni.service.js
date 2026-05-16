import { axiosInstance } from "../lib/axios";

export const getTestimoni = (callback) => {
    axiosInstance
        .get("/testimoni")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
