import React, { useContext } from "react"
import dayjs from 'dayjs';
import { DatePicker } from "@mui/x-date-pickers"
import { DateSelectorContext } from "@/app/contexts/DateSelectorContext"

enum DateViews {
  Day = 'day',
  Month = 'month',
  Year = 'year'
}

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
    <div className="flex flex-row items-center justify-center mt-4 p-2 bg-white rounded">
      <DatePicker
        label="Change Birthday"
        disabled={isDisabled}
        openTo={DateViews.Month}
        views={[DateViews.Month, DateViews.Day]}
        onAccept={setNewDate}
      />
    </div>
  )
};