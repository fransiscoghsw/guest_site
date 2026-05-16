import { axiosInstance } from "../lib/axios";

export const getArticleTags = (callback) => {
    axiosInstance
        .get("/tag-artikel")
        .then((res) => {
            callback(res.data.data.reverse());
        })
        .catch((err) => {
            console.log(err);
            callback([]);
        });
};
