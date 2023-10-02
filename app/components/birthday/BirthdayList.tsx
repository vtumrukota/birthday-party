import { use, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import debounce from "lodash-es/debounce"
import includes from "lodash-es/includes"
import { Pagination, TextField } from "@mui/material"
import { Birthday } from "../../models/Birthday"
import { BIRTHDAY_PAGE_SIZE, DEBOUNCE_DEFAULT } from "../globals.constants"
import { Loader } from "../utilities/loader/Loader"
import { BirthdaysContext } from "@/app/contexts/BirthdaysContext"
import { BirthdayRow } from "./BirthdayRow"

export const BirthdayList = (): JSX.Element => {
  const { birthdays, isLoading } = useContext(BirthdaysContext);
  const originalList = useRef<Birthday[]>(birthdays); // used by search to filter results
  const [displayedBdays, setDisplayedBdays] = useState<Birthday[]>(birthdays);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    originalList.current = birthdays;
    updatePage(1);
  }, [birthdays]);

  const handleSearch = (term: string) => {
    console.log('fired handle search', term);
    if (term === '') {
      updatePage(1);
      return;
    };
    const lwrcsTerm = term.trim().toLowerCase();
    const filtered: Birthday[] = originalList.current.filter((birthday: Birthday) => {
      const name = birthday.name.toLowerCase();
      const birthYear = birthday.birthYear.toString();
      const description = birthday.description?.toLowerCase();
      return includes(name, lwrcsTerm) || includes(birthYear, lwrcsTerm) || includes(description, lwrcsTerm);
    });
    setDisplayedBdays(filtered);
  };

  // Ensure the search is debounced to avoid looping through items on every keystroke
  const debouncedSearch = debounce((search: string) => {
    handleSearch(search);
  },
    DEBOUNCE_DEFAULT,
    { leading: false, trailing: true }
  );
  const totalCount = originalList.current.length;
  // const searchLabel = totalCount === displayedBdays.length ? `Search ${totalCount} Birthdays` : `Showing ${displayedBdays.length} / ${totalCount}`;
  
  const searchBirthdays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setSearchTerm(newVal);
    debouncedSearch(newVal)
  };

  const updatePage = (page: number) => {
    const start = page * BIRTHDAY_PAGE_SIZE;
    const end = start + BIRTHDAY_PAGE_SIZE;
    setDisplayedBdays(originalList.current.slice(start, end));
  }
  const handlePage = (_e: React.ChangeEvent<unknown> , page: number) => updatePage(page);

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center p-2">
      {/* Show loading state */}
      {isLoading ? <Loader content="Loading Birthdays..." /> : (
        <div className="flex flex-col h-full">
          <div className="flex flex-row justify-end items-center w-full mb-4">
            <Pagination
              count={Math.floor(originalList.current.length / BIRTHDAY_PAGE_SIZE)}
              onChange={handlePage}
              />
              {/* TODO: Fix debounce on search */}
            {/* <TextField
              className="w-[300px] bg-white mr-4"
              label={`Filter ${totalCount} Birthdays`}
              variant="outlined"
              value={searchTerm}
              onChange={searchBirthdays}
            /> */}
          </div>
          {/* Show cards or let user know their search had no matches (data will always return some people) */}
          {displayedBdays.length > 0 ? (
            <div className="grid grid-cols-4 items-center gap-8 pl-4 pr-4 overflow-y-auto">
              {displayedBdays.map((b) => <BirthdayRow key={`${b.name}-${b.description}`} birthday={b} />)}
            </div>
          ) : <h1 className="text-3xl">Sorry, no Birthdays matched 😔</h1>}
        </div>
      )}
    </div>
  )
}