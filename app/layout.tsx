import Providers from '@/redux/provider'
import type { Metadata } from 'next'
import SWRFetchConfig from '@/swr/config'

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
          <SWRFetchConfig>
            {children} 
          </SWRFetchConfig>
        </Providers>
      </body>
    </html>
  )
}
