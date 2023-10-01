import { useState } from "react";
import { BirthdayHeader } from "../components/birthday/BirthdayHeader";
import { BirthdayList } from "../components/birthday/BirthdayList";
import { DateSelectorContext, initDay } from "../contexts/DateSelectorContext";

export const BirthdayView = (): JSX.Element => {
  const [day, setDay] = useState<string>(initDay.day);
  const [month, setMonth] = useState<string>(initDay.month);

  return (
    <DateSelectorContext.Provider value={{ day, month, setDay, setMonth }}>
      <main className="flex flex-col max-h-screen items-center">
        <BirthdayHeader />
        <BirthdayList />
      </main>
    </DateSelectorContext.Provider>
  )
}