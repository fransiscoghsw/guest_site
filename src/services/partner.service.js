import { axiosInstance } from "../lib/axios";

export const getPartners = (callback) => {
    axiosInstance
        .get("/partner")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
