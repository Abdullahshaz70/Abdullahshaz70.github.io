import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: '[YOUR NAME] — AI / Software Engineer',
  description: 'I build intelligent systems, immersive digital experiences, and scalable software.',
  openGraph: {
    title: '[YOUR NAME] — AI / Software Engineer',
    description: 'Premium interactive developer portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@400;500&display=swap"
          rel="preload"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark-950 text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
