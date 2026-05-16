import { axiosInstance } from "../lib/axios";

export const getAllProduct = async (lang = "id") => {
    try {
        const res = await axiosInstance.get("/product", {
            params: { lang },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getProductById = (id, callback) => {
    axiosInstance
        .get(`/product/${id}`)
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getProductImage = (id, callback) => {
    axiosInstance
        .get(`/product/image/${id}`)
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
