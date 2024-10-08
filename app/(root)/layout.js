import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lintas Layak",
  description: "Generated by create next app",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`inter.className bg-[#f3f3f3]`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
