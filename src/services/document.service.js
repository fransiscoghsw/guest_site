import { axiosInstance } from "../lib/axios";

export const getDocument = async (lang = "id") => {
    try {
        const res = await axiosInstance.get("/dokumen-frontpage", {
            params: {lang}
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
