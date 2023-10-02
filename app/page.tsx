'use client';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BirthdayView } from './views/BirthdayView';

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      {/* Prepare for future Auth handling and easy app switching when new use-cases emerge */}
      <BirthdayView />
    </LocalizationProvider>
  )
}
