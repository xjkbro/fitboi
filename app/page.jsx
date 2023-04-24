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
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { equal } from "assert";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// const arr = Array.from(Array(20).keys());
// const imgArr = [
//     "https://images.unsplash.com/photo-1578681994506-b8f463449011?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
//     "https://images.unsplash.com/flagged/photo-1559502867-c406bd78ff24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80",
//     "https://images.unsplash.com/photo-1619603364904-c0498317e145?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//     "https://images.unsplash.com/photo-1591213954196-2d0ccb3f8d4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
// ];

export default function Home() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
    );
    const [image, setImage] = useState([]);
    useEffect(() => {
        async function getImages() {
            const { data } = await supabase
                .from("fits")
                .select("*")
                .eq("verified", true)
                .limit(20);
            if (data) setImage(data);
        }
        getImages();
    }, [supabase]);
    return (
        <main>
            <section className="grid grid-cols-4 gap-4 w-5/6 mx-auto">
                {[...image, ...image, ...image].map((card, index) => (
                    <HoverCard key={index}>
                        <HoverCardTrigger>
                            <AspectRatio ratio={3 / 4}>
                                <Image
                                    // src={
                                    //     imgArr[
                                    //         Math.floor(
                                    //             Math.random() * imgArr.length
                                    //         )
                                    //     ]
                                    // }
                                    src={`https://ykuaxkboovlonccelnlz.supabase.co/storage/v1/object/public/fits/${card.id}.png`}
                                    alt="Image"
                                    fill
                                    // width={600}
                                    // height={600}
                                    className="rounded-md object-cover"
                                />
                            </AspectRatio>
                        </HoverCardTrigger>
                        <HoverCardContent side="right" align="start">
                            <div className="flex gap-2 items-center">
                                <Avatar>
                                    {/* <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    /> */}
                                    <AvatarFallback>
                                        {card.handle.toUpperCase().substr(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                    @{card.handle}
                                </h3>
                            </div>
                            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                                <li>
                                    Top:{" "}
                                    <span className="text-sm text-muted-foreground">
                                        Uniqlo
                                    </span>
                                </li>
                                <li>
                                    Bottoms:{" "}
                                    <span className="text-sm text-muted-foreground">
                                        Zara
                                    </span>
                                </li>
                                <li>
                                    Jacket:{" "}
                                    <span className="text-sm text-muted-foreground">
                                        Urban Outfitter
                                    </span>
                                </li>
                                <li>
                                    Hat:{" "}
                                    <span className="text-sm text-muted-foreground">
                                        Zara
                                    </span>
                                </li>
                            </ul>
                        </HoverCardContent>
                    </HoverCard>
                ))}
            </section>
            {/* <div className="w-full mx-auto">
                <Alert className="w-1/2 mx-auto fixed bottom-12 z-50 translate-x-1/2 opacity-70 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                    </svg>
                    <AlertTitle>Want to upload?</AlertTitle>
                    <AlertDescription>
                        Click here or press space to pull up the upload form.
                    </AlertDescription>
                </Alert>
            </div> */}
            <UploadDialog supabase={supabase} />
        </main>
    );
}
