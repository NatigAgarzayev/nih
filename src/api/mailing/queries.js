import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constans";

export const useGetMailingAll = () => {
    return useQuery({
        queryKey: ["mailings"],
        queryFn: async () => {
            const res = await axios.get(
                `http://84.201.179.250:3000/demo/mailing/all`
            );
            return res.data;
        },
    });
};
export const useGetMailingOne = () => {
    return useQuery({
        queryKey: ["mailings"],
        queryFn: async () => {
            const res = await axios.get(
                `http://84.201.179.250:3000/demo/mailing/one`
            );
            return res.data;
        },
    });
};

export const useLauchMailing = () => {
    return useMutation({
        mutationFn: async (message) => {
            await axios.post(`http://84.201.179.250:3000/demo/mailing/launch`, {
                message: message,
            });
        },
        retry: 3,
    });
};
