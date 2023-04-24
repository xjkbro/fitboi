import Link from "next/link";
import React from "react";

export default function NavBar() {
    return (
        <header>
            <Link href="/">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-5/6 mx-auto py-4">
                    fitboi
                </h1>
            </Link>
        </header>
    );
}
