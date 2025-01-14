import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../components/utils/axios.js";

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
            return res.data
        },
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
        refetchIntervalInBackground: false
    })
}


export const useGetParserContent = (id) => {
    return useQuery({
        queryKey: ["parsed", id],
        queryFn: async () => {
            const res = await axios.get(`/parser/result/${id}`)
            return res.data
        },
        refetchOnWindowFocus: false
    })
}

export const useGetParsingStatus = (id) => {
    return useQuery({
        queryKey: ["parsing_status"],
        queryFn: async() => {
            const res = await axios.get(`/parser/process/status/${id}`)
            return res.data
        }
    })
}

export const useGetAutoParserContent = () => {
    return useQuery({
        queryKey: ["auto_parser"],
        queryFn: async () => {
            const res = await axios.get("/parser/participant/sources")
            return res.data
        },
        enabled: false
    })
}

export const useRemoveParsing = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({parsing_result_id}) => {
            await axios.delete(`/parser/result/close/${parsing_result_id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['parsings']
            })
        }
    })
}

export const useGetAutoParserLanguages = () => {
    return useQuery({
        queryKey: ["languages"],
        queryFn: async () => {
            const res = await axios.get("/parser/languages")
            return res.data
        },
        refetchOnWindowFocus: false,
        enabled: false
    })
}


export const useGetAutoParserCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axios.get("/parser/categories")
            return res.data
        },
        refetchOnWindowFocus: false,
        enabled: false
    })
}