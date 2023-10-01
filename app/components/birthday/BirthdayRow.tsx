import Card from "@mui/material/Card"
import { Birthday } from "../../models/Birthday"
import CardContent from "@mui/material/CardContent"
import { Avatar } from "@mui/material"
import { useState } from "react"

export const BirthdayRow = ({ birthday }: { birthday: Birthday }): JSX.Element => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <Card className="flex flex-row mt-5 border-2 border-stone-300 hover:border-green-700"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}>
      {showDetails ? (
        <CardContent className="flex flex-col items-center text-sm max-h-32 overflow-y-auto">
          {birthday.additionalDetails}
        </CardContent>
      ) : (
        <CardContent className="flex flex-col">
          <div className="flex flex-row items-center"> 
            <Avatar src={birthday.thumbnail} alt={birthday.name} className="flex-row"/>
            <h3 className="text-lg ml-2">{birthday.name}</h3>
          </div>
          <p className="text-sm pt-2 italic">{birthday.description}</p>
          <p className="text-sm pt-2">
            <span>👼 {birthday.birthYear}</span>
            {birthday.deathYear && <span> - 🪦 {birthday.deathYear}</span>}
          </p>
        </CardContent>
      )}
    </Card>
  )
}