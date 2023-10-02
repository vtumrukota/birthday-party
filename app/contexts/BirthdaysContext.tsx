import { createContext } from "react";
import { Birthday } from "../models/Birthday";

type BirthdayCtx= {
  birthdays: Birthday[],
  setBirthdays: React.Dispatch<React.SetStateAction<Birthday[]>>,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

export const BirthdaysContext = createContext<BirthdayCtx>({
  birthdays: [],
  setBirthdays: () => {},
  isLoading: false,
  setIsLoading: () => {}
});
