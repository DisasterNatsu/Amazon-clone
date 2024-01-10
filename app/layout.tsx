import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/provider/provider";
import { getServerSession } from "next-auth";
import SessionProvider from "@/provider/SessionProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Amazon Clone",
  description: "For experience",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <ReduxProvider>
            <Navbar />
            {children}
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
