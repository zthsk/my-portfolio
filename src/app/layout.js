import {Inter} from "next/font/google";
import "./globals.css";
import personalInfo from '../../data/personalInfo.json';

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    metadataBase: new URL('https://kshitiztiwari.com'),
    title: personalInfo.name + "'s Portfolio",
    description: personalInfo.site_description,
    openGraph: {
        title: personalInfo.name + "'s Portfolio",
        description: personalInfo.site_description,
        url: 'https://kshitiztiwari.com',
        siteName: personalInfo.name + ' Portfolio',
        images: [
            {
                url: '/images/avatar.jpeg',
                width: 800,
                height: 800,
                alt: personalInfo.name
            }
        ],
        locale: 'en_US',
        type: 'website',
    },
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={`${inter.className} text-slate-100 antialiased`}>{children}</body>
        </html>
    );
}
