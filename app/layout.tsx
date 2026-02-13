import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Halal 4 All TV Menu',
  description: 'Live Google Sheets driven butcher menu board'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
