import { useState } from "react";
import { BirthdayHeader } from "../components/birthday/BirthdayHeader";
import { BirthdayList } from "../components/birthday/BirthdayList";
import { DateSelectorContext } from "../contexts/DateSelectorContext";

export const BirthdayView = (): JSX.Element => {
  const [day, setDay] = useState<string>('10');
  const [month, setMonth] = useState<string>('10');

  return (
    <DateSelectorContext.Provider value={{ day, month, setDay, setMonth }}>
      <main className="flex max-h-screen flex-col items-center p-10">
        <BirthdayHeader />
        <BirthdayList />
      </main>
    </DateSelectorContext.Provider>
  )
}