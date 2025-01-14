import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "../../components/utils/axios.js"

export const useGetMessagesById = (id) => {
    return useQuery({
        queryKey: ['messages' , id],
        queryFn: async () => {
            const res = await axios.get(`/messenger/messages/${id}`)
            return res.data
        },
        refetchInterval: 5000,
        refetchIntervalInBackground: false
    })
}

export const useSendMessageByClient = (chat_id) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({chat_id, message}) => {
            await axios.post("/messenger/send-message",
            {
                chat_id,
                message
            }
        )},
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['messages', chat_id]
            })
        }
    })
}

export const useSendAiMessage = (chat_id) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({client_name}) => {
            await axios.post("/messenger/send-message/ai", {
                chat_id,
                client_name
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['messages', chat_id]
            })
        }
    })
}