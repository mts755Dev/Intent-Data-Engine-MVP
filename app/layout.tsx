import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Intent Data Engine',
  description: 'Simple Intent Data Engine MVP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

