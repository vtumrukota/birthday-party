import { Birthday } from "../../models/Birthday";
import { BirthdayRow } from "./BirthdayRow";

export const BirthdayPersons = ({ birthdays }: { birthdays: Birthday[] }): JSX.Element =>
  <div className="grid grid-cols-4 gap-4 p-2 border-2 border-green-800 mt-5 rounded">
    {birthdays.length === 0 ?
      // We should not expect to ever see this message ;)
      <h1 className="text-3xl">Well, looks like you are the only legend born today!</h1> :
      birthdays.map((birthday: Birthday) => <BirthdayRow birthday={birthday} key={birthday.name} />)
    }
  </div>