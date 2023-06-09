"use client";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export const revalidate = 1200;

export default function User({ params }) {
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
                .eq("user", params.id)
                .limit(20);
            console.log(data);
            if (data) setImages(data);
        }
        getImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supabase]);
    return (
        <>
            <NavBar user={user} setUser={setUser} />
            <main>
                <section className="grid grid-cols-4 gap-4 w-5/6 mx-auto">
                    {images.map((card, index) => (
                        <HoverCard key={index}>
                            <HoverCardTrigger>
                                <AspectRatio ratio={3 / 4}>
                                    <Image
                                        src={`https://ykuaxkboovlonccelnlz.supabase.co/storage/v1/object/public/fits/${card.id}.png`}
                                        alt="Image"
                                        // fill
                                        width={600}
                                        height={600}
                                        className="rounded-md object-cover h-full "
                                    />
                                </AspectRatio>
                            </HoverCardTrigger>
                            <HoverCardContent
                                side="right"
                                align="start"
                                className="md:w-96"
                            >
                                <div className="flex gap-2 items-center">
                                    <Avatar>
                                        <AvatarImage
                                            src={card.user.metadata.picture}
                                            alt="User Profile Picture"
                                        />
                                        <AvatarFallback>
                                            {card.user.metadata.full_name
                                                .toUpperCase()
                                                .substr(0, 1)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Link href={"/u/" + card.user.id}>
                                        <h3 className="scroll-m-20 text-normal md:text-lg font-semibold tracking-tight">
                                            @{card.user.metadata.full_name}
                                        </h3>
                                    </Link>
                                </div>
                                <ul className="my-6 ml-6 list [&>li]:mt-2">
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
            </main>
        </>
    );
}
