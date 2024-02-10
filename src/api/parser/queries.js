import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constans.js";
export const useGetParticipantById = (id) => {
    return useQuery({
        queryKey: ["participants"],
        queryFn: async () => {
            const res = await axios.get(
                `${BASE_URL}/parser/participants/${id}`
            );
            return res;
        },
        enabled: false,
    });
};

export const usePostGroups = () => {
    return useMutation({
        mutationFn: async (groupName) => {
            const groupNameTransformed = groupName.split("/").slice(-1);
            console.log(groupNameTransformed[0]);
            await axios.post(
                `${BASE_URL}/parser/participants/group/${groupNameTransformed[0]}`
            );
        },
    });
};
