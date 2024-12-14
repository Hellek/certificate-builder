import './globals.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

const fontGoogle = Roboto({ weight: ['400', '500', '700'], subsets: ['cyrillic-ext'] })

export const metadata: Metadata = {
  title: 'Certificate visual builder',
  description: 'Certificate visual builder of Roman Basharin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={fontGoogle.className}>
        <div className="grow min-h-screen flex flex-col relative">
          <main className="grow flex">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
