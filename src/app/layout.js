import '../styles/globals.css';

export const metadata = {
  title: 'Front store',
  description: 'Simple front store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
