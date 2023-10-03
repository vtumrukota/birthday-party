'use client'

import { createContext, useState } from "react";
import { getCurrentDate } from "../helpers/dateHelper";

type DateSelectorCtx = {
  day: string,
  month: string,
  setDay: React.Dispatch<React.SetStateAction<string>>,
  setMonth: React.Dispatch<React.SetStateAction<string>>,
}

// grab current date to initialize calendar
export const initDay = getCurrentDate()

/**
 * Context for the date selector component - default to current day/month
 */
export const DateSelectorContext = createContext<DateSelectorCtx>({
  day: initDay.day,
  month: initDay.month,
  setDay: () => {},
  setMonth: () => {}
});

/**
 * This is the DateSelectorProvider used to get the day & month across the app
 * 
 * @param children: <JSX.Element> - the children of the provider 
 * @returns 
 */
export const DateSelectorProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [day, setDay] = useState<string>(initDay.day);
  const [month, setMonth] = useState<string>(initDay.month);

  return (
    <DateSelectorContext.Provider value={{ day, month, setDay, setMonth }}>
      {children}
    </DateSelectorContext.Provider>
  )
}