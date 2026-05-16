import { axiosInstance } from "../lib/axios";

export const createRegistrationAgen = async (formData) => {
    try {
        const res = await axiosInstance.post("/agent/registrationEggPackaging", formData);
        return res.data.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const createRegistrationAgenTray = async (formData) => {
    try {
        const res = await axiosInstance.post("/agent/registrationEggTray", formData);
        return res.data.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};