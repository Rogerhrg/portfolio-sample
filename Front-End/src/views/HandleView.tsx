import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { getUserByHandle } from "../api/WikiTreeAPI"

export default function HandleView() {

  const params = useParams()
  const handle = params.handle!
  const { data, isLoading, error } = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ['handle',handle],
    retry: 1 
  })

  if (isLoading) return 'Cargando...'
  if (error) return <Navigate to={'/404'} />
  
  console.log(data)

  return (
    <div>HandleView</div>
  )
}
