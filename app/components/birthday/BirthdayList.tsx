import { useCallback, useContext, useRef, useState } from "react"
import debounce from "lodash-es/debounce"
import { Birthday } from "../../models/Birthday"
import { DEBOUNCE_DEFAULT } from "../globals.constants"
import { Loader } from "../utilities/loader/Loader"
import { BirthdaysContext } from "@/app/contexts/BirthdaysContext"
import { BirthdayRow } from "./BirthdayRow"

export const BirthdayList = (): JSX.Element => {
  const { birthdays, setBirthdays, isLoading } = useContext(BirthdaysContext);
  const originalList = useRef<Birthday[]>(birthdays); // used by search to filter results
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = useCallback(() => {
    if (searchTerm === '') {
      setBirthdays(originalList.current);
      return
    }
    const lwrcsTerm = searchTerm.toLowerCase();
    const filtered: Birthday[] = originalList.current.filter((birthday: Birthday) => {
      const name = birthday.name.toLowerCase();
      const birthYear = birthday.birthYear.toString();
      const description = birthday.description?.toLowerCase();
      return name.includes(lwrcsTerm) || birthYear.includes(lwrcsTerm) || description?.includes(lwrcsTerm);
    });
    setBirthdays(filtered);
  }, [searchTerm, setBirthdays]);

  // Ensure the search is debounced to avoid looping through items on every keystroke
  const totalCount = originalList.current.length;
  const debouncedSearch = debounce(handleSearch, DEBOUNCE_DEFAULT);
  
  const searchBirthdays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setSearchTerm(newVal);
    debouncedSearch();
  }

  return (
    <div className="flex w-[70%] p-2 border-2 m-5 rounded items-center justify-center bg-slate-200 overflow-y-auto">
      {isLoading ? <Loader content="Loading Birthdays..." /> : (
        <>
          {birthdays.length > 0 ? (
            // use virtualized grid to render the list of birthday cards since this API is not paginated
            // NOTE: we are assuming the list is never more than a thousand items (<= 600 max)
            <div className="grid grid-cols-3 items-center gap-4 pl-2 pr-2">
              {birthdays.map((b) => <BirthdayRow key={`${b.name}-${b.description}`} birthday={b} />)}
            </div>
          ) : (
            // This will appear if the filter returns no results
            // Technically, if the page doesnt have birthdays this will appear as well but that should never occur
            <h1 className="text-3xl">Sorry, no Birthdays matched 😔</h1>
          )}
        </>
      )}
    </div>
  )
}