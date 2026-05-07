import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Fira_Code } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { Providers } from "./providers"
import messages from "../../messages/en.json"
import "@/styles/globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
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
      className={`${plusJakartaSans.variable} ${firaCode.variable}`}
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
