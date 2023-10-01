import { useCallback, useContext, useEffect, useRef, useState } from "react"
import debounce from "lodash-es/debounce"
import { Button, Stack, TextField } from "@mui/material"
import { useOnThisDay, OnThisDayTypes } from "@/app/hooks/useOnThisDay"
import { DateSelectorContext } from "@/app/contexts/DateSelectorContext"
import { Birthday } from "../../models/Birthday"
import { BirthdayPersons } from "./BirthdayPersons"
import { DEBOUNCE_DEFAULT } from "../globals.constants"
import { BirthdayError } from "../utilities/errors/BirthdayError"
import { DateSelector } from "../utilities/dateSelector/DateSelector"
import { Loader } from "../utilities/loader/Loader"

export const BirthdayList = (): JSX.Element => {
  const hasLoaded = useRef<boolean>(false);
  const originalList = useRef<Birthday[]>([]); // used by search to filter results
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
  const { day, month } = useContext(DateSelectorContext);
  const { data, isLoading, error } = useOnThisDay(triggerFetch, OnThisDayTypes.Birthday, day, month);

  // create birthday classes and sorted by descending birth year
  useEffect(() => {
    if (!data) return;
    console.log('data', data.b)
    const birthdays = data.births
      .map((birthday: any) => new Birthday(birthday))
      .sort((a: Birthday, b: Birthday) => b.birthYear - a.birthYear);
    originalList.current = birthdays;
    setBirthdays(birthdays);
    setTriggerFetch(false) // reset trigger to allow re-fetch on button click
  }, [data])

  const fetchBirthdays = () => {
    if (!hasLoaded.current) hasLoaded.current = true;
    setTriggerFetch(true);
  }

  const handleSearch = useCallback(() => {
    if (!searchTerm) {
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
  }, [searchTerm]);

  // Ensure the search is debounced to avoid looping through items on every keystroke
  const totalCount = birthdays.length;
  const debouncedSearch = debounce(handleSearch, DEBOUNCE_DEFAULT);
  
  const searchBirthdays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setSearchTerm(newVal);
    debouncedSearch();
  }

  // If data fetch fails, throw modal and ask user to restart the app
  if (error) return <BirthdayError />

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <Stack direction="row" spacing={2}>
          <div className="flex flex-row items-center justify-center">
            <Button
              disabled={isLoading}
              className="!bg-red-600 hover:!bg-lime-950"
              variant="contained"
              onClick={fetchBirthdays}>
              {`View Birthdays on ${month}/${day}`}
            </Button>
          </div>
          {hasLoaded.current && <DateSelector isDisabled={isLoading} />}
        </Stack>
      </div>

      {/* Only render the list if the user has clicked the button */}
      {hasLoaded.current && (
        <>
          <TextField
            id="search-birthdays"
            className="w-[400px] mt-5 ml-5 bg-white"
            helperText="Search by name, year of birth, or description"
            label={`Search through ${totalCount} results below`}
            value={searchTerm}
            onSubmit={searchBirthdays}
            onChange={searchBirthdays} />
          <div className="flex w-[70%] p-2 border-2 m-5 rounded overflow-y-auto">
            {isLoading ? <Loader content="Loading Birthdays..." /> : <BirthdayPersons birthdays={birthdays} />}
          </div>
        </>
      )}
    </>
  )
}