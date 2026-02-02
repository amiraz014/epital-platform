import "./globals.css";

export const metadata = {
  title: "Epital",
  description: "Planning des gardes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
