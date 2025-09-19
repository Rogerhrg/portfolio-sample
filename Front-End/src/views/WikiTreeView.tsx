import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { social } from "../data/social" 
import WikiTreeInput from "../components/WikiTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
import { updateProfile } from "../api/WikiTreeAPI"
import type { User, SocialNetwork } from "../types"

export default function WikiTreeView() {
  const [wikiTreeLinks, setWikiTreeLinks] = useState(social)

  const queryClient = useQueryClient()
  const user: User = queryClient.getQueryData(['user'])!
  

  const { mutate } = useMutation ({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Actualizado correctamente')
    }
  })

  useEffect(() => {
    const updatedData = wikiTreeLinks.map(item => {
      const userLink = JSON.parse(user.links).find((link:SocialNetwork) => link.name === item.name)
      if(userLink) {
        return {...item, url: userLink.url, enabled:userLink.enabled}
      }
      return item
    })
    setWikiTreeLinks(updatedData)
  }, [])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uptadedLinks = wikiTreeLinks.map(link => link.name === e.target.name? {...link, url:e.target.value}: link)
    console.log(uptadedLinks)
    setWikiTreeLinks(uptadedLinks)

    queryClient.setQueryData(['user'], (prevData:User) => {
      return {
        ...prevData,
        links: JSON.stringify(uptadedLinks)
      }
    })
  }
  
  
  const handleEnableLink = (SocialNetwork: string) => {
    const uptadedLinks = wikiTreeLinks.map(link => {
      if(link.name === SocialNetwork) {
        if(isValidUrl(link.url)) {
          return {...link, enabled: !link.enabled}
        } else {
          toast.error('URL no válida')
        }
      }
      return link
    })
    setWikiTreeLinks(uptadedLinks)
    
    queryClient.setQueryData(['user'], (prevData:User) => {
      return {
        ...prevData,
        links: JSON.stringify(uptadedLinks)
      }
    })

  }

  return (
    <div className="space-y-5">
      {wikiTreeLinks.map( item => (
        <WikiTreeInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <button 
      className="bg-cyan-400 text-lg p-2 w-full uppercase text-slate-600 rounded font-bold"
      onClick={() => mutate(user)}
      >Guardar Cambios</button>
      
    </div>
  )
}
