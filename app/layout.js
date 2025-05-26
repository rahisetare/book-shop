// app/layout.js
import './globals.css';
import { Inter } from 'next/font/google'; // ✅ Use a supported Google font

const inter = Inter({ subsets: ['latin'] }); // Configure the font

export const metadata = {
  title: 'Your Website Title',
  description: 'Your Website Description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}> {/* ✅ Applies the font */}
      <body>{children}</body>
    </html>
  );
}
