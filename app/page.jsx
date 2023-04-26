"use client";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UploadDialog from "@/components/UploadDialog";
import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import { Sidescroll } from "@/components/Sidescroll";

export const revalidate = 1200;

export default function Home() {
    const { supabase } = useSupabase();
    const [images, setImages] = useState([]);
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getImages() {
            const { data } = await supabase
                .from("fits")
                .select(
                    `
                    id,
                    user (
                        id,
                         metadata
                    ),
                    info
                `
                )
                // .eq("verified", true)
                .limit(20);
            console.log(data);
            if (data) setImages(data);
        }
        getImages();
    }, [supabase]);
    return (
        <>
            <NavBar user={user} setUser={setUser} />
            <main>
                <div className="h-[400px] w-full">
                    <Sidescroll images={images} speed="4" />
                </div>
                <br />
                <div className="h-[400px] w-full">
                    <Sidescroll images={images} speed="3" />
                </div>
                <UploadDialog
                    user={user}
                    setUser={setUser}
                    setImages={setImages}
                />
            </main>
        </>
    );
}
