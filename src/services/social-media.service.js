import { axiosInstance } from "../lib/axios";

export const getSocialMedia = async () => {
    try {
        const res = await axiosInstance.get("/sosial-media");
        return res.data.data;
    } catch (err) {
        console.log(err);
        return [];
    }
};
