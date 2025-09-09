import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import { getUser } from "../api/WikiTreeAPI"
import WikiTree from "../components/WikiTree"

export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry:1,
        refetchOnWindowFocus: false
    })

    if (isLoading) return 'Cargando...'
    if (isError) return <Navigate to={'/auth/login'} />
    if (data) return <WikiTree data={data} />
}