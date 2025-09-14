import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs'; // Importă Clerk

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    {/* Învelește totul cu <ClerkProvider> */}
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}


import './globals.css'

export const metadata = {
      generator: 'v0.app'
    };
