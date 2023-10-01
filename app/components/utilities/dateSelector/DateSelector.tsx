import React, { useContext, useState } from "react"
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers"
import { DateSelectorContext } from "@/app/contexts/DateSelectorContext"

enum DateViews {
  Day = 'day',
  Month = 'month',
  Year = 'year'
}

export const DateSelector = (): JSX.Element => {
  const [selection, setSelection] = useState<Dayjs | null>(null);
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');

  const setNewDate = (value: Date | null, context: PickerChangeHandlerContext<DateValidationError>) => {
    if (!value) return;
    const dayMonth = dayjs(value);
    setSelection(dayMonth);
    const d = `${dayMonth.get('date')}`;
    const m = `${dayMonth.get('month') + 1}`;
    setDay(d);
    setMonth(m);
    console.log('set month and day', m, d)
  };

  return (
    <DateSelectorContext.Provider value={{ day, month }}>
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
          onChange={setNewDate}
        />
      </div>
    </DateSelectorContext.Provider>
  )
}