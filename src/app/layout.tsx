// app/layout.tsx

import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SupportChat } from "@/components/SupportChat";

export const metadata = {
  title: "Orbitfx Solution",
  description: "Enterprise-grade trading infrastructure for Forex brokers and prop firms — white-label platforms, risk management, and institutional-grade technology.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class">
          <Header />
          {children}
          <Footer />
          <SupportChat /> 
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}