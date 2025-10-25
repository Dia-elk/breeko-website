import type {Metadata} from "next";
import {Cairo, Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Analytics} from "@vercel/analytics/next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const cairo = Cairo({
    variable: "--font-cairo",
    subsets: ["latin"],
})

export const metadata = {
    title: 'Breeko – Get Help Fast, Earn Money Faster in Morocco',
    description: 'Breeko is Morocco’s trusted task marketplace. Post errands, get instant help, or earn money by completing local tasks. Join our waitlist today.',
    keywords: ['Breeko', 'Morocco tasks', 'task marketplace', 'earn money Morocco', 'delivery', 'shopping', 'repairs'],
    openGraph: {
        title: 'Breeko – Get Help Fast, Earn Money Faster in Morocco',
        description: 'Morocco’s trusted local task marketplace. Post errands, get instant help, or earn money completing tasks.',
        url: 'https://breeko.ma',
        siteName: 'Breeko',
        locale: 'en_US',
        type: 'website',
    },
}


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${cairo.variable} antialiased`}
        >
        {children}
        <Analytics/>
        </body>
        </html>
    );
}
