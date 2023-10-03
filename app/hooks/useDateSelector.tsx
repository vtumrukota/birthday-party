import { useContext } from "react";
import { DateSelectorContext } from "../contexts/DateSelectorContext";

export const useDateSelector = () => {
  const { day, month, setDay, setMonth } = useContext(DateSelectorContext);
  return { day, month, setDay, setMonth };
}