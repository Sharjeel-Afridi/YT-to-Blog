import "./globals.css";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  variable: "--font-mont",
  weight: ["100", "400", "500", "900"],
  subsets: ['latin'] 
});

export const metadata = {
  title: "YT to Blog Post",
  description: "Generate Blog From YouTube Video",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
