import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constans";

export const useGetContacts = () => {
    return useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const res = await axios.get(
                `http://84.201.179.250:3000/demo/contacts`
            );
            return res.data;
        },
    });
};
