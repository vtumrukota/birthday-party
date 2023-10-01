import { createContext } from "react";
import { getCurrentDate } from "../helpers/dateHelper";

type DateSelectorContextType = {
  day: string,
  month: string,
  setDay: (day: string) => void,
  setMonth: (month: string) => void,
}

// grab current date to initialize calendar
export const initDay = getCurrentDate()

/**
 * Context for the date selector component - default to current day/month
 */
export const DateSelectorContext = createContext<DateSelectorContextType>({
  day: initDay.day,
  month: initDay.month,
  setDay: () => {},
  setMonth: () => {}
});