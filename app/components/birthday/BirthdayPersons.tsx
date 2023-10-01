import { Birthday } from "../../models/Birthday";
import { BirthdayRow } from "./BirthdayRow";

export const BirthdayPersons = ({ birthdays }: { birthdays: Birthday[] }): JSX.Element =>
  <>
    {birthdays.length === 0 ?
      // We should not expect to ever see this message ;)
      <h1 className="text-3xl">Well, looks like you are the only legend born today!</h1> :
      birthdays.map((birthday: Birthday) => <BirthdayRow key={birthday.name} birthday={birthday} />)
    }
  </>