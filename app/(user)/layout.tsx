import Link from "next/link";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/provider";

export const metadata = {
  title: "LestsCode",
  description: "This is LetsCode.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="text-sky-700  underline font-bold text-3xl p-4 m-2 flex justify-center items-center">
          <Link href="/" className="text-center">
            LetsCode.com
          </Link>
        </div>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
