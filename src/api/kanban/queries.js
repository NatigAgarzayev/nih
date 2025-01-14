import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "../../components/utils/axios.js"

export const useGetKanban = () => {
    return useQuery({
        queryKey: ["kanban"],
        queryFn: async () => {
            const res = await axios.get("/kanban/progress-tickets")
            return res.data
        },
        refetchInterval: 120000,
        refetchIntervalInBackground: false
    })
}

export const useUpdateStatus = () => {
    return useMutation({
        mutationFn: async ({progress_ticket_id, status}) => {
            await axios.put(`/kanban/progress-tickets/${progress_ticket_id}`,{
                status
            })    
        }
    })
}

export const useUpdateTicketStatuses = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async() => {
            await axios.post("/kanban/update-statuses")
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["kanban"]
            })
        }
    })
}