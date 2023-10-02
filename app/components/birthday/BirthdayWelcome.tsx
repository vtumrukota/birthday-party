import Image from 'next/image'

export const BirthdayWelcome = (): JSX.Element =>
  <section className="flex flex-col h-screen w-screen items-center justify-center p-5">
    <h1 className="text-4xl font-bold">Welcome to Birthday Party!</h1>
    <p className="text-lg pt-4">Please select a day & month to see who was born on that day.</p>
    <Image
      className="rounded-lg"
      src="/images/bday-party.png"
      alt="birthday-party"
      height={400}
      width={400}
    />
  </section>