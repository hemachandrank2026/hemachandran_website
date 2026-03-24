import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hemachandran K | AI Research Director & Associate Dean",
  description: "Dr. Hemachandran K - Director of AI Research Centre, Associate Dean of Business School at Woxsen University. Expert in AI, ML, NLP, Computer Vision, and Autonomous Robotics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
