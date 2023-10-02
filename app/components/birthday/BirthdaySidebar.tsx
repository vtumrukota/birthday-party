import { useContext, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { OnThisDayTypes, useOnThisDay } from "@/app/hooks/useOnThisDay";
import { DateSelectorContext } from "@/app/contexts/DateSelectorContext";
import { Birthday } from "@/app/models/Birthday";
import { BirthdaysContext } from "@/app/contexts/BirthdaysContext";
import { DateSelector } from "../utilities/dateSelector/DateSelector";
import { BirthdayError } from "../utilities/errors/BirthdayError";

export const BirthdaySidebar = (): JSX.Element => {
  const { setBirthdays, setIsLoading } = useContext(BirthdaysContext);
  const hasLoaded = useRef<boolean>(false);
  const { day, month } = useContext(DateSelectorContext);
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
  const { data, isLoading, error } = useOnThisDay(day, month, OnThisDayTypes.Birthday, triggerFetch);

  const fetchBirthdays = () => {
    if (!hasLoaded.current) hasLoaded.current = true;
    setTriggerFetch(true);
    setIsLoading(true);
  }

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


  if (error) return <BirthdayError />

  return (
    <article className="flex flex-col h-screen w-[300px] items-center justify-center bg-slate-200">
      <h1 className="text-3xl p-2 font-bold">🎈Birthday Party🎈</h1>
      <h5 className="m-5 italic text-md">
        Learn about notable current and historical figures who share a birthday
      </h5>
      <Button
        disabled={isLoading}
        className="!mt-5 !bg-red-600 hover:!bg-lime-950"
        variant="contained"
        onClick={fetchBirthdays}>
        {`See Birthdays on ${month}/${day}`}
      </Button>
      {hasLoaded.current && <DateSelector isDisabled={isLoading} />}
    </article>
  )
}