"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSupabase } from "./providers/supabase-provider";
import { useRouter } from "next/navigation";

export default function NavBar({ user, setUser }) {
    const { supabase } = useSupabase();
    const router = useRouter();
    // const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            const { data } = await supabase.auth.getUser();
            if (data.user) setUser(data.user);
        }
        getUser();
    }, []);

    async function signout() {
        const { error } = await supabase.auth.signOut();
        setUser(null);
        router.refresh();
        router.replace("/");
    }
    return (
        <header className="flex justify-between mx-auto items-center w-5/6">
            <Link href="/">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-5/6 mx-auto py-4">
                    fitboi
                </h1>
            </Link>
            {user && (
                <Button variant="outline" onClick={signout}>
                    Sign Out
                </Button>
            )}
        </header>
    );
}
