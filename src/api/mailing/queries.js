import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../components/utils/axios.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export const useCreateNewsletter = () => {
    const nav = useNavigate()
    return useMutation({
        mutationFn: async ({participant_ids}) => {
            console.log("participant_ids = ", participant_ids)
            const res = await axios.post("/parser/newsletter", {
                participant_ids: participant_ids
            })
            return res.data
        },
        onSuccess: (data) => {
            console.log("data success data =", data)
            Cookies.set("newsletter_id", data.newsletter_id)
            nav("/nih/mailing-launcher")
        }
    })
} 

export const useGetNewsletterParticipants = (id) => {
    return useQuery({
        queryKey: ['newsletter_participants', id],
        queryFn: async () => {
            const res = await axios.get(`/parser/newsletter/${id}`)
            return res.data
        },
        enabled: false
    })
}

export const useLaunchNewsletter = () => {
    const nav = useNavigate()
    return useMutation({
        mutationFn: async ({title, message_pattern, newsletter_id, triggered_link, prompt_message}) => {
            await axios.post("/parser/newsletter/launch", {
                title: title,
                message_pattern: message_pattern,
                newsletter_id: +newsletter_id,
                triggered_link: triggered_link,
                prompt_message: prompt_message
            })
        }
    })
}

export const useGetClientMailings = () => {
    return useQuery({
        queryKey: ['mailings'],
        queryFn: async () => {
            const res = await axios.get("/parser/newsletter/mailings")
            return res.data
        },
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
        refetchIntervalInBackground: false
    })
}

export const useGetMailingParticipants = (id) => {
    return useQuery({
        queryKey: ['mailing_id', id],
        queryFn: async () => {
            const res = await axios.get(`/parser/newsletter/info/${id}`)
            return res.data
        }
    })
}

export const useGetNewsletterStatus = (id) => {
    return useQuery({
        queryKey: ["mailing_status", id],
        queryFn: async() => {
            const res = await axios.get(`/parser/newsletter/status/${id}`)
            return res.data
        }
    })
}

export const useRemoveNewsletter = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({newsletter_id}) => {
            await axios.delete(`/parser/newsletter/close/${newsletter_id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['mailings']
            })
        }
    })
}