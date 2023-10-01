import React, { useContext } from "react"
import dayjs from 'dayjs';
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers"
import { DateSelectorContext } from "@/app/contexts/DateSelectorContext"

enum DateViews {
  Day = 'day',
  Month = 'month',
  Year = 'year'
}

export const DateSelector = (): JSX.Element => {
  const { day, month, setDay, setMonth } = useContext(DateSelectorContext);

  const setNewDate = (value: Date | null) => {
    if (!value) return;
    const dayMonth = dayjs(value);
    const newDay = `${dayMonth.get('date')}`;
    const newMonth = `${dayMonth.get('month') + 1}`;
    if (day !== newDay) setDay(newDay);
    if (month !== newMonth) setMonth(newMonth);
  };

  return (
    <div className="flex flex-row items-center justify-center mt-5 p-5 rounded border-2 bg-white">
      <h1 className="mr-5 pb-6 font-bold">Select A Birthday:</h1>
      <DatePicker
        label="Month & Day"
        slotProps={{
          textField: { 
            helperText : 'For leap years use Feb. 29, 2020' }
          }
        }
        openTo={DateViews.Month}
        views={[DateViews.Month, DateViews.Day]}
        onAccept={setNewDate}
      />
    </div>
  )
};