'use client'

import { useState } from "react";
import Button from "@mui/material/Button";
import { useOnThisDay } from "@/app/hooks/useOnThisDay";
import { useDateSelector } from "@/app/contexts/DateSelectorContext";
import { DateSelector } from "../utilities/dateSelector/DateSelector";
import { BirthdayError } from "./BirthdayError";

export const BirthdaySidebar = ({ hasFetched, setHasFetched } : {
  hasFetched: boolean,
  setHasFetched: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const { day, month } = useDateSelector();
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
  const { isLoading, error } = useOnThisDay({ day, month, triggerFetch });

  const fetchBirthdays = () => {
    if (!hasFetched) setHasFetched(true);
    setTriggerFetch(true);
  }

  return (
    <section className="flex flex-col h-screen min-w-[240px] items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 text-gray-700 text-shadow-md">
      <h1 className="text-2xl">🎈 Birthday Party 🎈</h1>
      <h5 className="mt-5 text-sm">Who else shares your Birthday?</h5>
      {error ? <BirthdayError /> : (
        <>
          {!hasFetched && <Button
            aria-label="See Birthdays"
            disabled={isLoading}
            className="!bg-slate-600 hover:!bg-slate-400 !mt-4"
            variant="contained"
            onClick={fetchBirthdays}>
            {`See Today's Birthdays`}
          </Button>}
          {hasFetched && <DateSelector isDisabled={isLoading} />}
        </>
      )}
      <h4 className="text-md mt-4">Current Date: {month}/{day}</h4>
    </section>
  )
}