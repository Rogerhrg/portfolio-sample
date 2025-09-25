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
    setWikiTreeLinks(uptadedLinks)
  }
  
  const links: SocialNetwork[] = JSON.parse(user.links)


  const handleEnableLink = (socialNetwork: string) => {
    const uptadedLinks = wikiTreeLinks.map(link => {
      if(link.name === socialNetwork) {
        if(isValidUrl(link.url)) {
          return {...link, enabled: !link.enabled}
        } else {
          toast.error('URL no válida')
        }
      }
      return link
    })
    setWikiTreeLinks(uptadedLinks)

    let updatedItems: SocialNetwork[] = []

    const selectedSocialNetwork = uptadedLinks.find(link => link.name === socialNetwork)
    if(selectedSocialNetwork?.enabled) {
      const id = links.filter (link => link.id).length + 1
      if (links.some(link => link.name === socialNetwork)) {
        updatedItems = links.map(link => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id
            }      
          } else {
            return link
          }
        }
        )
      } else {
        const newItem = {
        ...selectedSocialNetwork,
        id
      }
        updatedItems = [...links, newItem]

      }
    } else {
      const indexToUpdate = links.findIndex(link=> link.name === socialNetwork)
      updatedItems = links.map(link => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled : false
            }
          } else if (link.id > indexToUpdate && (indexToUpdate !==0 && link.id !== 1)) {
              return {
                ...link, 
                id : link.id - 1
              }
          } else {
            return link
          }
        })}
    console.log(updatedItems)

    queryClient.setQueryData(['user'], (prevData:User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems)
      }
    }
  )

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
      onClick={() => mutate(queryClient.getQueryData(['user'])!)}
      >Guardar Cambios</button>
      
    </div>
  )
}
