import './globals.css';
import Providers from './providers'; // this will wrap Mantine

export const metadata = {
  title: 'Mock’n-Hire',
  description: 'AI-powered resume screening platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
