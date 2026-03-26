import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivam Ghodake",
  description: "Software Engineer portfolio of Shivam Ghodake — projects, skills, experience, publications, and contact.",
  keywords: ["Shivam Ghodake", "Software Engineer", "VIT Pune", "Portfolio", "Full Stack", "Java", "Python"],
  icons: {
    icon: "shivam.jpg",
  },
  authors: [{ name: "Shivam Ghodake" }],
  openGraph: {
    title: "Shivam Ghodake | Software Engineer",
    description: "Software Engineer portfolio — projects, skills, experience, and contact.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full scroll-smooth`}
      style={{ background: "#080808" }}
    >
      <body
        className={`${montserrat.className} min-h-full flex flex-col antialiased`}
        style={{ background: "#080808", color: "#ffffff", overflowX: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}