import Head from 'next/head'
import { Montserrat,Lato } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Minerva LMS</title>
        <meta name="description" content="Plataforma para el apredizaje online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </Head>
      <main className={`${styles.main} ${montserrat.className}`}>
        <h1>MINERVA</h1>
      </main>
    </>
  )
}
