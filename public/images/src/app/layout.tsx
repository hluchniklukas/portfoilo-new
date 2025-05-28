import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '180° - Pomáháme firmám vyniknout na sociálních sítích',
  description: 'Pomáháme firmám vyniknout na sociálních sítích',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
} 