"use client";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import Header from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthProvider";

const Component = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <title>FaceFinder AI | Reuniting Loved Ones, One Face at a Time.</title>
        <meta
          name="description"
          content="FaceFinder AI is an advanced machine learning platform designed to find lost people using real-time CCTV surveillance and facial recognition technology. With a multi-panel system for users, administrators, and AI processing, the platform streamlines the process of identifying missing individuals by analyzing live video feeds. Powered by state-of-the-art face detection and matching algorithms, FaceFinder AI helps families, police, and communities reunite with loved ones faster and more efficiently than traditional search methods."
        />
      </head>
      <body className={`antialiased`}>
        <Toaster />
        <Header />
        {children}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Component>{children}</Component>
    </AuthProvider>
  );
}
