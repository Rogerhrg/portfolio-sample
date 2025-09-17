import { useState } from "react"
import { social } from "../data/social" 
import WikiTreeInput from "../components/WikiTreeInput"

export default function WikiTreeView() {
  const [wikiTreeLinks, setWikiTreeLinks] = useState(social)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uptadedLinks = wikiTreeLinks.map(link => link.name === e.target.name? {...link, url:e.target.value}: link)
    console.log(uptadedLinks)
    setWikiTreeLinks(uptadedLinks)
  }

  const handleEnableLink = (SocialNetwork: string) => {
    const uptadedLinks = wikiTreeLinks.map(link => link.name === SocialNetwork? {...link, enabled: !link.enabled}: link)
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
