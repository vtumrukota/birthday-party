import './globals.css'
import type { Metadata } from 'next'
import { Epilogue, Arimo } from 'next/font/google'

const epilogue = Epilogue({ subsets: ['latin'] })
const arimo = Arimo({ subsets: ['latin'], display: 'swap' })

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
    <html lang="en" >
      <body className={arimo.className}>{children}</body>
    </html>
  )
}
