import { useState } from "react"
import { social } from "../data/social" 
import WikiTreeInput from "../components/WikiTreeInput"

export default function WikiTreeView() {
  const [wikiTreeLinks, setWikiTreeLinks] = useState(social)

  return (
    <div className="space-y-5">
      {wikiTreeLinks.map( item => (
        <WikiTreeInput
          key={item.name}
          item={item}
        />
      ))}
    </div>
  )
}
