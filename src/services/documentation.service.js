import { axiosInstance } from "../lib/axios";

export const getDocumentation = (callback) => {
    axiosInstance
        .get("/dokumentasi-frontpage")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
