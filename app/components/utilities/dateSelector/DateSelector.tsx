'use client'

import React, { useContext } from "react"
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { DateSelectorContext } from "@/app/contexts/DateSelectorContext"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

enum DateViews {
  Day = 'day',
  Month = 'month',
  Year = 'year'
}

/**
 * Material UI datepicker - used to allow users to change birthday day & month
 * 
 * We currently block year behavior, but the user can navigate backwards through months
 * to access leap year if needed.
 * 
 * @param isDisabled: <boolean> - whether the datepicker should be disabled
 * @returns <JSX.Element> - the datepicker component
 */
export const DateSelector = ({ isDisabled }: {isDisabled?: boolean }): JSX.Element => {
  const { setDay, setMonth } = useContext(DateSelectorContext);

  const setNewDate = (value: Date | null) => {
    if (!value) return;
    const dayMonth = dayjs(value);
    const newDay = `${dayMonth.get('date')}`;
    const newMonth = `${dayMonth.get('month') + 1}`;
    setDay(newDay);
    setMonth(newMonth);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <div className="flex flex-row items-center justify-center mt-4 p-2 rounded">
        <DatePicker
          className="w-[200px]"
          label={isDisabled ? 'Loading...' : 'Select a Date'}
          disabled={isDisabled}
          openTo={DateViews.Day}
          views={[DateViews.Day, DateViews.Month]}
          onAccept={setNewDate}
        />
      </div>
    </LocalizationProvider>
  )
};