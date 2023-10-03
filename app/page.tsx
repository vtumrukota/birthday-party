import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BirthdayView } from './views/BirthdayView';

export default function Home() {
  return (
    <BirthdayView />
  )
}
