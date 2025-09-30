// Root layout component - wraps all pages
    // Replaces the original HTML structure from index.html (making changes from the original chatbot structure)
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OnTop AI Chat',
  description: 'Corporate AI Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 p-0 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
