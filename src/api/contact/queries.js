import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "../../components/utils/axios.js"

export const useGetClientContacts = () => {
    return useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            const res = await axios.get("/messenger/contacts")
            return res.data
        },
        refetchOnWindowFocus: false,
    })
}

export const useRemoveClientContact = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({chat_id}) => {
            await axios.delete(`/messenger/close/${chat_id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['contacts']
            })
        }
    })
}