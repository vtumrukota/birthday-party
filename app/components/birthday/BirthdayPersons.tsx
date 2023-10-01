import { Birthday } from "../../models/Birthday";
import { BirthdayRow } from "./BirthdayRow";

export const BirthdayPersons = ({ birthdays }: { birthdays: Birthday[] }): JSX.Element =>
  <>
    {birthdays.length === 0 ?
      // We should not expect to ever see this message ;)
      <h1 className="text-3xl">Wow, looks like you are the only legend born today!</h1> :
      // use virtualized grid to render the list of birthday cards since this API is not paginated
      // NOTE: we are assuming the list is never more than a thousand items (<= 600 max)
      <div className="grid grid-cols-3 items-center gap-4 pl-2 pr-2">
        {birthdays.map((birthday) => <BirthdayRow key={birthday.name} birthday={birthday} />)}
      </div>
    }
  </>