import Providers from "@/redux/provider";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minerva LMS",
  description: "Plataforma de aprendizaje en línea",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers> {children} </Providers>
      </body>
    </html>
  );
}
