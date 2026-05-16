import { axiosInstance } from "../lib/axios";

export const getAbouts = async (lang = "id") => {
    try {
        const res = await axiosInstance.get("/tentang-kami", {
            params: {lang},
        });
        return res.data.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getAboutSejarahs = async (lang = "id") => {
    try {
        const res = await axiosInstance.get("/sejarah", {
            params: {lang},
        });
        return res.data.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getFounder = async (lang = "id") => {
    try {
        const res = await axiosInstance.get("/founder", {
            params: {lang},
        });
        return res.data.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
