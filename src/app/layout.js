import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import "./globals.css";
import personalInfo from '../../data/personalInfo.json';

config.autoAddCss = false

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
    twitter: {
        card: 'summary_large_image',
        title: personalInfo.name + "'s Portfolio",
        description: personalInfo.site_description,
        images: ['/images/avatar.jpeg'],
    },
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className="font-sans text-zinc-100 antialiased">{children}</body>
        </html>
    );
}
