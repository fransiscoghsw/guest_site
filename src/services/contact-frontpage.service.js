import { axiosInstance } from "../lib/axios";
export const getContactFrontpage = () => {
    return new Promise((resolve, reject) => {
        axiosInstance
            .get("/kontak-frontpage")
            .then((res) => resolve(res.data.data))
            .catch((err) => reject(err));
    });
};
