import { useState } from "react";
import { BirthdaySidebar } from "../components/birthday/BirthdaySidebar";
import { BirthdayList } from "../components/birthday/BirthdayList";
import { DateSelectorContext, initDay } from "../contexts/DateSelectorContext";
import { BirthdaysContext } from "../contexts/BirthdaysContext";
import { Birthday } from "../models/Birthday";

export const BirthdayView = (): JSX.Element => {
  const [day, setDay] = useState<string>(initDay.day);
  const [month, setMonth] = useState<string>(initDay.month);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);

  return (
    <DateSelectorContext.Provider value={{ day, month, setDay, setMonth }}>
      <BirthdaysContext.Provider value={{ birthdays, setBirthdays, isLoading, setIsLoading }}>
        <main className="flex flex-row max-h-screen items-center">
          <BirthdaySidebar />
          <BirthdayList />
        </main>
      </BirthdaysContext.Provider>
    </DateSelectorContext.Provider>
  )
}