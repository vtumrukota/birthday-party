import React, { useState } from "react"
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers"

enum DateViews {
  Day = 'day',
  Month = 'month',
  Year = 'year'
}

export const DateSelector = (): JSX.Element => {
  const [day, setDay] = useState<string>('')
  const [month, setMonth] = useState<string>('')

  const setNewDate = (value: Date | null, context: PickerChangeHandlerContext<DateValidationError>) => {
    console.log('date', value, context)
  }

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
        onChange={setNewDate}
      />
    </div>
  )
}