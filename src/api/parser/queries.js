import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../components/utils/axios.js";
export const useGetParticipantById = (id) => {
    return useQuery({
        queryKey: ["participants"],
        queryFn: async () => {
            const res = await axios.get(
                `/parser/participants/${id}`
            );
            return res;
        },
        enabled: false,
    });
};

export const useManualParserLaunch = () => {
    return useMutation({
        mutationFn: async (data) => {
            console.log("cahnnels", data.channel_ids)
            console.log("grourps", data.group_ids)
            await axios.post(
                `/parser/manual/start`,
                {
                    channel_ids: data.channel_ids,
                    group_ids: data.group_ids
                }
            );
        },
    });
};

export const useGetParsingResults = () => {
    return useQuery({
        queryKey: ["parsings"],
        queryFn: async () => {
            const res = await axios.get(`/parser/results`)
            return res
        },
        enabled: true
    })
}


export const useGetParserContent = (id) => {
    return useQuery({
        queryKey: ["parsed", id],
        queryFn: async () => {
            const res = await axios.get(`/parser/result/${id}`)
            return res
        }
    })
}