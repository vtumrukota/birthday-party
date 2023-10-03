'use client'

import { useState } from "react";
import { BirthdaySidebar } from "../components/birthday/BirthdaySidebar";
import { BirthdayList } from "../components/birthday/BirthdayList";
import { DateSelectorProvider } from "../contexts/DateSelectorContext";
import { BirthdayWelcome } from "../components/birthday/BirthdayWelcome";

export const BirthdayView = (): JSX.Element => {
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  return (
    <DateSelectorProvider>
      <main className="flex flex-row max-h-screen items-center font-sans">
        <BirthdaySidebar hasFetched={hasFetched} setHasFetched={setHasFetched} />
        {hasFetched ? <BirthdayList /> : <BirthdayWelcome />}
      </main>
    </DateSelectorProvider>
  )
}