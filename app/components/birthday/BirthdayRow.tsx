import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Avatar } from "@mui/material"
import { Birthday } from "../../models/Birthday"

export const BirthdayRow = ({ birthday }: { birthday: Birthday }): JSX.Element =>
  <div className="group relative">
    <Card className="border-2 h-40 bg-slate-100 rounded-xl cursor-pointer">
      <a href={birthday.externalLink || birthday.image} target="_blank" rel="noopener noreferrer">
        <CardContent className="flex flex-col">
          <div className="flex flex-row items-center">
            <Avatar
              className="flex-row"
              src={birthday.thumbnail} alt={birthday.name}
              variant="rounded"
              imgProps={{ loading: 'lazy' }}
            />
            <h3 className="text-xl ml-2 font-semibold line-clamp-2">{birthday.name}</h3>
          </div>
          <p className="text-md pt-2 line-clamp-2">{birthday.description}</p>
          <p className="text-md pt-2 font-medium">
            <span>👼 {birthday.birthYear}</span>
            {birthday.deathYear && <span> - 🪦 {birthday.deathYear}</span>}
          </p>
        </CardContent>
        {/* show more details about the person on hover - use pure CSS to keep this performant */}
        <Card className="hidden absolute top-0 left-0 right-0 bottom-0 rounded-xl transition duration-300 group-hover:block group-hover:!bg-blue-600">
          <CardContent className="flex flex-col items-center text-sm max-h-44 overflow-y-auto italic text-white">
            {birthday.additionalDetails}
          </CardContent>
        </Card>
      </a>
    </Card>
  </div>
