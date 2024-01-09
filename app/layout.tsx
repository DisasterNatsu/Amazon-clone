import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "react-redux";
import ReduxProvider from "@/provider/provider";

export const metadata: Metadata = {
  title: "Amazon Clone",
  description: "For experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
