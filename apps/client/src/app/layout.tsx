import Footer from "@/widgets/footer/ui";
import Header from "@/widgets/header/ui";
import localFont from "next/font/local";
import AuthInit from "./AuthInit";
import StoreProvider from "./StoreProvider";
import "./globals.css";

const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${switzer.className} antialiased`}>
        <StoreProvider>
          <AuthInit>
            <Header />
            {children}
            <Footer />
          </AuthInit>
        </StoreProvider>
      </body>
    </html>
  );
}
