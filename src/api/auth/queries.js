import { useQuery } from "@tanstack/react-query"
import axios from "../../components/utils/axios.js"

export const useGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axios.get(`/oauth2/userinfo`)
            return res.data
        },
        enabled: false,
    })
}