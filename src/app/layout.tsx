import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { Providers } from "./providers"
import messages from "../../messages/en.json"
import "@/styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Manish Soni — Lead Software Engineer",
  description:
    "Product-focused Lead Software Engineer specializing in 0→1 products and scalable platform architecture. React, Next.js, Golang.",
  openGraph: {
    title: "Manish Soni — Lead Software Engineer",
    description:
      "Product-focused Lead Software Engineer specializing in 0→1 products and scalable platform architecture.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Providers>
          <NextIntlClientProvider locale="en" messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
