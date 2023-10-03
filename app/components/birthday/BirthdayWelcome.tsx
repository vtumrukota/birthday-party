import Image from 'next/image'

export const BirthdayWelcome = (): JSX.Element =>
  <section className="flex flex-col h-screen w-screen items-center justify-center p-5">
    <h1 className="text-4xl font-bold">Welcome to Birthday Party!</h1>
    <p className="text-lg pt-4 mb-4">Please select a month and day to start the fun!</p>
    <Image
      className="rounded-lg"
      src="/images/dog-cake.png"
      alt="dog-cake"
      height={300}
      width={300}
      loading="lazy"
    />
  </section>