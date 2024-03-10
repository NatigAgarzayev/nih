import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../components/utils/axios.js";

export const useGetMailingAll = () => {
    return useQuery({
        queryKey: ["mailings"],
        queryFn: async () => {
            const res = await axios.get(
                `/demo/mailing/all`
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
                `/demo/mailing/one`
            );
            return res.data;
        },
    });
};

export const useLauchMailing = () => {
    return useMutation({
        mutationFn: async (message) => {
            await axios.post(`/demo/mailing/launch`, {
                message: message,
            });
        },
        retry: 3,
    });
};
