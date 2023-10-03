'use client'

import { useCallback, useEffect, useRef, useState } from "react"
import debounce from "lodash/debounce"
import { Pagination, TextField } from "@mui/material"
import { filterBirthdays } from "@/app/helpers/filterBirthdays"
import { useOnThisDay } from "@/app/hooks/useOnThisDay"
import { BIRTHDAY_PAGE_SIZE, DEBOUNCE_DEFAULT } from "../globals.constants"
import { Birthday } from "../../models/Birthday"
import { BirthdayRow } from "./BirthdayRow"
import { BirthdayLoader } from "./BirthdayLoader"
import { useDateSelector } from "@/app/contexts/DateSelectorContext"

export const BirthdayList = (): JSX.Element => {
  const { day, month } = useDateSelector();
  const { data, isLoading } = useOnThisDay({ day, month });
  const [displayedBdays, setDisplayedBdays] = useState<Birthday[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const originalList = useRef<Birthday[]>([]); // used by search to filter results
  const totalCount = originalList.current.length;
  const [pageCount, setPageCount] = useState<number>(Math.floor(totalCount / BIRTHDAY_PAGE_SIZE));
  const resultsLabel = `Showing ${searchTerm ? displayedBdays.length : totalCount} of ${totalCount}`;

  // create birthday classes and sorted by descending birth year
  useEffect(() => {
    if (!data) return;
    const sortedBdays = data.births
      .map((birthday: any) => new Birthday(birthday))
      .sort((a: Birthday, b: Birthday) => b.birthYear - a.birthYear);
    originalList.current = sortedBdays;
    updatePage(1);
    setPageCount(Math.floor(sortedBdays.length / BIRTHDAY_PAGE_SIZE) || 1);
  }, [data]);

  const handleSearch = (term: string) => {
    if (term === '') {
      updatePage(1);
      setPageCount(Math.floor(originalList.current.length / BIRTHDAY_PAGE_SIZE) || 1);
    } else {
      const filtered = filterBirthdays(term, originalList.current);
      setDisplayedBdays(filtered);
      setPageCount(Math.floor(filtered.length / BIRTHDAY_PAGE_SIZE) || 1);
    }
  };

  // Ensure the search is debounced to avoid filtering too quickly on each keystroke
  const debouncedSearch= debounce((s) => handleSearch(s), DEBOUNCE_DEFAULT, { leading: false, trailing: true });
  const searchBirthdays = useCallback(debouncedSearch, [debouncedSearch]);
  
  const searchResults = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setSearchTerm(newVal);
    searchBirthdays(newVal)
  };

  const updatePage = (page: number) => {
    const start = page * BIRTHDAY_PAGE_SIZE;
    const end = start + BIRTHDAY_PAGE_SIZE;
    setDisplayedBdays(originalList.current.slice(start, end));
  }
  
  const handlePage = (_e: React.ChangeEvent<unknown> , page: number) => updatePage(page);

  return (
    <div className="flex flex-col h-screen w-screen min-w-[650px] items-center justify-center">
      {isLoading ? <BirthdayLoader />: (
        <div className="flex flex-col h-full w-full items-center">
          <div className="flex flex-row justify-end items-center w-full pb-4 pt-4 border-b-2 border-slate-200">
            <Pagination
              className="mr-2"
              count={pageCount}
              onChange={handlePage}
            />
            <TextField
              aria-label="Search Birthdays"
              className="w-[220px] bg-white mr-4"
              label={resultsLabel}
              variant="outlined"
              value={searchTerm}
              onChange={searchResults}
            />
          </div>
          {/* Show cards or let user know their search had no matches (data will always return some people) */}
          {displayedBdays.length > 0 ? (
            <div className="grid gap-6 w-full p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-center overflow-y-auto">
              {displayedBdays.map((b) => <BirthdayRow key={`${b.name}-${b.description}`} birthday={b} />)}
            </div>
          ) : <h1 className="text-xl mt-12 p-4 bg-slate-200 rounded-md">Sorry, no Birthdays matched 😔</h1>}
        </div>
      )}
    </div>
  )
}