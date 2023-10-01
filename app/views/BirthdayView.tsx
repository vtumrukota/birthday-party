import { BirthdayHeader } from "../components/birthday/BirthdayHeader";
import { BirthdayList } from "../components/birthday/BirthdayList";

export const BirthdayView = (): JSX.Element =>
  <main className="flex min-h-screen flex-col items-center p-10">
    <BirthdayHeader />
    <BirthdayList />
  </main>