import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Avatar } from "@mui/material"
import { Birthday } from "../../models/Birthday"

export const BirthdayRow = ({ birthday }: { birthday: Birthday }): JSX.Element => (
  <div className="group relative">
    <Card className="border-2 h-40 bg-slate-100">
      <CardContent className="flex flex-col">
        <div className="flex flex-row items-center">
          <Avatar src={birthday.thumbnail} alt={birthday.name} className="flex-row"/>
          <h3 className="text-lg ml-2 line-clamp-2">{birthday.name}</h3>
        </div>
        <p className="text-sm pt-2 italic line-clamp-2">{birthday.description}</p>
        <p className="text-md pt-2 font-bold">
          <span>👼 {birthday.birthYear}</span>
          {birthday.deathYear && <span> - 🪦 {birthday.deathYear}</span>}
        </p>
      </CardContent>
      {/* show more details about the person on hover - use pure CSS to keep this performant */}
      <Card className="hidden absolute top-0 left-0 right-0 bottom-0 transition duration-300 group-hover:block group-hover:!bg-red-200">
        <CardContent className="flex flex-col items-center text-sm max-h-36 overflow-y-auto italic">
          {birthday.additionalDetails}
        </CardContent>
      </Card>
    </Card>
  </div>
);
