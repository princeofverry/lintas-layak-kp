import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lintas Layak - Admin",
  description: "Admin section of the application",
  icons: {
    icon: "/logo.png",
  },
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`inter.className bg-[#f3f3f3]`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
