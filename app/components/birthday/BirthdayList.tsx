import { useEffect, useState } from "react"
import { useOnThisDay, OnThisDayTypes } from "@/app/hooks/useOnThisDay"
import { DateSelector } from "../utilities/dateSelector/DateSelector"
import { Skeleton } from "@mui/material"
import { Birthday } from "../../models/Birthday"
import { BirthdayPersons } from "./BirthdayPersons"

export const BirthdayList = (): JSX.Element => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const { data, isLoading, error } = useOnThisDay(OnThisDayTypes.Birthday, '01', '02');

  useEffect(() => {
    if (!data) return;
    // create birthday classes and sort by year in most recent order
    console.log('data', data.births)
    const birthdays = data.births
      .map((birthday: any) => new Birthday(birthday))
      .sort((a: Birthday, b: Birthday) => b.birthYear - a.birthYear);
    console.log('birthdays', birthdays);
    setBirthdays(birthdays);
  }, [data])
  
  return (
    <>
      <DateSelector />
      {isLoading ? 
        <Skeleton variant="rectangular" width={200} /> :
        <BirthdayPersons birthdays={birthdays} />
      }
    </>
  )
}