import { createContext, useContext } from "react";

type DateSelectorContextType = {
  day: string | null,
  month: string | null,
}

export const DateSelectorContext = createContext<DateSelectorContextType>({ day: null, month: null });

export const useDateSelectorContext = () => {
  return useContext(DateSelectorContext)
}