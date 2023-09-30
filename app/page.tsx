'use client';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BirthdayApp } from './BirthdayApp';

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Prepare for future Auth handling and easy app switching when new use-cases emerge */}
      <BirthdayApp />
    </LocalizationProvider>
  )
}
