import axios from "axios";
import { BaseUrlProcess, BaseUrlProfile, BaseUrlTags } from "../../../Constants/baseUrls";

export const APIProcess = axios.create({
    baseURL: BaseUrlProcess,
});

export const APIProfile = axios.create({
    baseURL: BaseUrlProfile,
    headers: {
        "Access-Control-Allow-Origin": "localhost",
    },
});

export const APITags = axios.create({
    baseURL: BaseUrlTags,
});

APIProcess.interceptors.response.use(
    async (response) => response,
    (error) => {
        if (error.response.status === 500) {
            localStorage.clear();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

APITags.interceptors.response.use(
    async (response) => {
        const token = await response.status;
        if (token === 500 || token === 401) {
            localStorage.clear();
            window.location.reload();
        }
        return response;
    },
    (error) => {
        if (error.response.status === 500) {
            localStorage.clear();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

APIProfile.interceptors.response.use(
    async (response) => {
        try {
            const token = await response.status;
            if (token === 500 || token === 401) {
                localStorage.clear();
                window.location.reload();
            }
            return response;
        } catch (err) {
            return response;
        }
    },
    (error) => {
        if (error.response.status === 500) {
            localStorage.clear();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);
