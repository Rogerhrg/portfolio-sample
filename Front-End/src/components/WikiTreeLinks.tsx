import type { SocialNetwork } from "../types"

type WikiTreeLinksProps = {
    link: SocialNetwork
}

export default function WikiTreeLinks({link}:WikiTreeLinksProps) {
  return (
    <li className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg">
        <div 
            className="w-12 h-12 bg-cover"
            style={{backgroundImage: `url('/social/icon_${link.name}.svg')`}}
        />
        <p className="capitalize">Visita Mi: <span className="font-bold">{link.name}</span></p>
    </li>
  )
}
