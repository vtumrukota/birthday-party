import Image from 'next/image'
import CircularProgress from '@mui/material/CircularProgress'
import { getRandomCakeImage } from '@/app/helpers/getRandomCakeImage'

export const BirthdayLoader = (): JSX.Element => {
  const { path, alt } = getRandomCakeImage();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col">
        <Image
          priority
          className="rounded-lg"
          src={path}
          alt={alt}
          height={200}
          width={200}
        />
      </div>
      <div className="flex flex-col mt-4">
        <div className="flex flex-row">
          <CircularProgress />
          <h1 className="ml-4 text-4xl font-bold">Have some cake while you wait!</h1>
        </div>
      </div>
    </div>
  )
}