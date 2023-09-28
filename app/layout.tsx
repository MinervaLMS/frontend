import MainAppBar from '@/components/layout/MainAppBar'
import Providers from '@/redux/provider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Minerva LMS',
  description: 'Plataforma de aprendizaje en línea'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body>
        <Providers>
          <MainAppBar />
          {children}{' '}
        </Providers>
      </body>
    </html>
  )
}
