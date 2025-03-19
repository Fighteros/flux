import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Navbar/Nav";
import NavBarContainer from "@/components/Navbar/NavBarContainer";
import Provider from "@/lib/utils/Providers";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Flux Blog",
    description: "Millions of people who learn, share, and grow together",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/logo.svg"/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
        <Provider>
            <NavBarContainer>
                <Nav/>
            </NavBarContainer>
            {children}
        </Provider>
        </body>
        </html>
    );
}
