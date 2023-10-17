import Link from "next/link";
import "../globals.css";
import Navbar from "@/components/Navbar";
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
        <div>
          <Link
            href="/"
            className="text-sky-700 w-1/5  underline font-bold text-3xl p-2 m-2 flex items-center justify-center mx-auto"
          >
            LetsCode
          </Link>
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
