import { useContext, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import {  useOnThisDay } from "@/app/hooks/useOnThisDay";
import { DateSelectorContext } from "@/app/contexts/DateSelectorContext";
import { Birthday } from "@/app/models/Birthday";
import { BirthdaysContext } from "@/app/contexts/BirthdaysContext";
import { DateSelector } from "../utilities/dateSelector/DateSelector";
import { BirthdayError } from "../utilities/errors/BirthdayError";
import { OnThisDayTypes } from '../../hooks/hooks.definitions';

export const BirthdaySidebar = ({ hasFetched, setHasFetched } : {
  hasFetched: boolean,
  setHasFetched: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const { setBirthdays, setIsLoading } = useContext(BirthdaysContext);
  const { day, month } = useContext(DateSelectorContext);
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
  const { data, isLoading, error } = useOnThisDay(day, month, OnThisDayTypes.Birthday, triggerFetch);

  // create birthday classes and sorted by descending birth year
  useEffect(() => {
    if (!data) return;
    console.log('data', data)
    const sortedBdays = data.births
      .map((birthday: any) => new Birthday(birthday))
      .sort((a: Birthday, b: Birthday) => b.birthYear - a.birthYear);
    console.log('sorted', sortedBdays);
    setBirthdays(sortedBdays);
    setTriggerFetch(false); // reset fetch state
    setIsLoading(false); // help ensure data shows up before loader disappears
  }, [data, setBirthdays, setIsLoading]);

  const fetchBirthdays = () => {
    if (!hasFetched) setHasFetched(true);
    setTriggerFetch(true);
    setIsLoading(true);
  }

  return (
    <section className="flex flex-col h-screen min-w-[320px] items-center justify-center bg-zinc-600 text-white">
      <h1 className="text-3xl font-bold">🎈 Birthday Party 🎈</h1>
      <h5 className="m-5 italic text-sm">Who elses shares your Birthday?</h5>
      {error ? <BirthdayError /> : (
        <>
          <Button
            disabled={isLoading}
            className="!bg-red-600 hover:!bg-slate-900"
            variant="contained"
            onClick={fetchBirthdays}>
            {`See Birthdays on ${month}/${day}`}
          </Button>
          {hasFetched && <DateSelector isDisabled={isLoading} />}
        </>
      )}
    </section>
  )
}