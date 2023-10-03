'use client'

import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import {  useOnThisDay } from "@/app/hooks/useOnThisDay";
import { DateSelectorContext } from "@/app/contexts/DateSelectorContext";
import { DateSelector } from "../utilities/dateSelector/DateSelector";
import { BirthdayError } from "../utilities/errors/BirthdayError";

export const BirthdaySidebar = ({ hasFetched, setHasFetched } : {
  hasFetched: boolean,
  setHasFetched: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const { day, month } = useContext(DateSelectorContext);
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
  const { isLoading, error } = useOnThisDay({ day, month, triggerFetch });

  const fetchBirthdays = () => {
    if (!hasFetched) setHasFetched(true);
    setTriggerFetch(true);
  }

  return (
    <section className="flex flex-col h-screen min-w-[260px] items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 text-slate-800">
      <h1 className="text-2xl font-bold">🎈 Birthday Party 🎈</h1>
      <h5 className="m-5 text-sm">Who elses shares your Birthday?</h5>
      {error ? <BirthdayError /> : (
        <>
          {!hasFetched && <Button
            aria-label="See Birthdays"
            disabled={isLoading}
            className="!bg-slate-600 hover:!bg-slate-400"
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