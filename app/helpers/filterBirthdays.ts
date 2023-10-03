import includes from "lodash-es/includes";
import { Birthday } from "../models/Birthday";

export const filterBirthdays = (term: string, bdayList: Birthday[]) => {
  const lwrcsTerm = term.trim().toLowerCase();
  return bdayList.filter((birthday: Birthday) => {
    const name = birthday.name.toLowerCase();
    const birthYear = birthday.birthYear.toString();
    const description = birthday.description?.toLowerCase();
    return includes(name, lwrcsTerm) || includes(birthYear, lwrcsTerm) || includes(description, lwrcsTerm);
  });
};