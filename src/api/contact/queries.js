import { useQuery } from "@tanstack/react-query";
import axios from "../../components/utils/axios.js";

export const useGetContacts = () => {
    return useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const res = await axios.get(
                `/demo/contacts`
            );
            return res.data;
        },
    });
};
