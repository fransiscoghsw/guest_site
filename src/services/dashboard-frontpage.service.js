import { axiosInstance } from "../lib/axios";

export const getDashboardFrontpage = async (lang = "id") => {
    try {
        const res = await axiosInstance.get("/homepage", {
            params: { lang },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getDashboardFrontpageImage = (imageName) => {
    return `${BASE_URL}/homepage/image/${imageName}`;
};
