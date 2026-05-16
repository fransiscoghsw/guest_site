import { axiosInstance } from "../lib/axios";

export const getFounders = (callback) => {
    axiosInstance
        .get("/founder")
        .then((res) => {
            callback(res.data.data);
            console.log(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
