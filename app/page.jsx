"use client";
import UploadDialog from "@/components/UploadDialog";
import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";
import NavBar from "@/components/NavBar";
import { Sidescroll } from "@/components/Sidescroll";

export const revalidate = 1200;

export default function Home() {
    const { supabase } = useSupabase();
    const [images, setImages] = useState([]);
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
            // console.log(data);
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
