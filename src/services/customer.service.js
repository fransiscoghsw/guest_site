import { axiosInstance } from "../lib/axios";

export const getCustomers = (callback) => {
    axiosInstance
        .get("/customer")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
