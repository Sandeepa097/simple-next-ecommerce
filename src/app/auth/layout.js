export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
