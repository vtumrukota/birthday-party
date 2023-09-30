import { DateSelector } from "./components/dateSelector/DateSelector";
import { Header } from "./components/header/Header";

export const BirthdayApp = (): JSX.Element =>
  <main className="flex min-h-screen flex-col items-center p-10">
    <Header />
    <DateSelector />
  </main>