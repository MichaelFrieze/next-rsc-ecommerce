import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Nav from './components/Nav';
import './globals.css';
import { getServerSession } from 'next-auth/next';
import Hydrate from './components/Hydrate';
import { Roboto, Lobster_Two } from 'next/font/google';

// Define main font
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the user
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" data-theme="light">
      <body className={`mx-4 lg:mx-48 ${roboto.className}`}>
        <Hydrate>
          <Nav user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
