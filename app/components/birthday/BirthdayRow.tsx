import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Avatar } from "@mui/material"
import { Birthday } from "../../models/Birthday"

export const BirthdayRow = ({ birthday }: { birthday: Birthday }): JSX.Element =>
  <div className="group mt-5 relative">
    <Card className="border-2 border-stone-500">
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
    </Card>
    {/* show more details about the person on hover */}
    <Card className="hidden absolute top-0 left-0 right-0 bottom-0 bg-white transition duration-300 group-hover:block">
      <CardContent className="flex flex-col items-center text-sm max-h-32 overflow-y-auto italic">
        {birthday.additionalDetails}
      </CardContent>
    </Card>
  </div>