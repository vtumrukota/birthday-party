import { useContext, useEffect, useRef, useState } from "react"
import { Skeleton } from "@mui/material"
import { useOnThisDay, OnThisDayTypes } from "@/app/hooks/useOnThisDay"
import { DateSelectorContext } from "@/app/contexts/DateSelectorContext"
import { DateSelector } from "../utilities/dateSelector/DateSelector"
import { Birthday } from "../../models/Birthday"
import { BirthdayPersons } from "./BirthdayPersons"

export const BirthdayList = (): JSX.Element => {
  const { day, month } = useContext(DateSelectorContext);
  const original = useRef<Birthday[]>([]); // used by search to filter results
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const { data, isLoading, error } = useOnThisDay(OnThisDayTypes.Birthday, day || '11',  month || '11');

  // create birthday classes and sorted by descending birth year
  useEffect(() => {
    if (!data) return;
    console.log('data', data.births)
    const birthdays = data.births
      .map((birthday: any) => new Birthday(birthday))
      .sort((a: Birthday, b: Birthday) => b.birthYear - a.birthYear);
    console.log('birthdays', birthdays);
    original.current = birthdays;
    setBirthdays(birthdays);
  }, [data])

  return (
    <>
      <DateSelector />
      {/* TODO: implement search by name or year */}
      {/* <SearchInput /> */}
      <div className="grid grid-cols-4 gap-6 min-w-[1200px] p-6 border-2 border-green-800 m-5 rounded max-h-[50rem] min-h-[600px] overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <h1>Loading...</h1>
            <Skeleton variant="rounded" width={1000} height={400} />
          </div>
        ) : (
          // TODO: add virtualization to this list
          <BirthdayPersons birthdays={birthdays} />
        )}
      </div>
    </>
  )
}