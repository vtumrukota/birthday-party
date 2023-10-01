import { createContext } from "react";

type DateSelectorContextType = {
  day: string | null,
  month: string | null,
  setDay: (day: string) => void,
  setMonth: (month: string) => void,
}

/**
 * Context for the date selector component
 */
export const DateSelectorContext = createContext<DateSelectorContextType>({
  day: null,
  month: null,
  setDay: () => {},
  setMonth: () => {}
});