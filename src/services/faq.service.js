import { axiosInstance } from "../lib/axios";

export const getFaqs = async (lang = "id") => {
    try {
        const res = await axiosInstance.get("/faq", {
            params: {lang},
        });
        return res.data.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
