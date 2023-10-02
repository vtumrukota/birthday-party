import { createContext } from "react";
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