import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });
import NavBar from "@/components/NavBar";

export const metadata = {
    title: "fitboi",
    description: "share your fit for today boi",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className + " dark"}>
                <NavBar />
                {children}
            </body>
        </html>
    );
}
