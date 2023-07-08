import "./globals.css";
import { Inter } from "next/font/google";
import AppContextProvider from "./contexts/appContext/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HASSPathways",
  description: "Here you can explore the different pathways RPI has to offer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body className={inter.className}>{children}</body>
      </AppContextProvider>
    </html>
  );
}
