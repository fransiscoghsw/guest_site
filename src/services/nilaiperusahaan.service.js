import { axiosInstance } from "../lib/axios";

export const getNilaiPerusahaan = (callback) => {
    axiosInstance
        .get("/nilai-nilai-perusahaan")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
