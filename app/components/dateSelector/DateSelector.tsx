import { DatePicker } from "@mui/x-date-pickers"

enum DateViews {
  Day = 'day',
  Month = 'month',
  Year = 'year'
}

export const DateSelector = () =>
  <div className="flex flex-row items-center justify-center mt-5 p-5 rounded border bg-white">
    <h1 className="mr-5 font-bold">Select a Birthday:</h1>
    <DatePicker
      label="Month & Day"
      slotProps={{
        textField:{ helperText : 'For leap years, please navigate to February 2020' }
      }}
      openTo={DateViews.Month}
      views={[DateViews.Month, DateViews.Day]}
    />
  </div>