// app/layout.tsx

import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "CubeX",
  description: "This is my local project",
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
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}