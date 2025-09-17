import { useState } from "react"
import { social } from "../data/social" 
import WikiTreeInput from "../components/WikiTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"

export default function WikiTreeView() {
  const [wikiTreeLinks, setWikiTreeLinks] = useState(social)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uptadedLinks = wikiTreeLinks.map(link => link.name === e.target.name? {...link, url:e.target.value}: link)
    console.log(uptadedLinks)
    setWikiTreeLinks(uptadedLinks)
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
    console.log(uptadedLinks)
    setWikiTreeLinks(uptadedLinks)
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
    </div>
  )
}
