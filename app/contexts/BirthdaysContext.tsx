import { createContext } from "react";
import { Birthday } from "../models/Birthday";

type BirthdayContextType = {
  birthdays: Birthday[],
  setBirthdays: (birthdays: Birthday[]) => void,
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void,
}

export const BirthdaysContext = createContext<BirthdayContextType>({
  birthdays: [],
  setBirthdays: () => {},
  isLoading: false,
  setIsLoading: () => {}
});
