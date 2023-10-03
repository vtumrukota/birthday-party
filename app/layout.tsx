import './globals.css'
import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'

const heebo = Heebo({ subsets: ['latin'], display: 'swap', variable: '--font-heebo' })

export const metadata: Metadata = {
  title: 'Birthday Party!',
  description: 'Find out who else shares your birthday!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${heebo.variable} font-sans`}>
      <body >{children}</body>
    </html>
  )
}
