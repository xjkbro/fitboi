"use client";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidescroll = ({ images, speed = 50000, user }) => {
    return (
        <>
            <div className="inner">
                <div className="wrapper">
                    <section style={{ "--speed": `${speed}ms` }}>
                        {images.map((card, index) => (
                            <div key={index}>
                                <Image
                                    src={`https://ykuaxkboovlonccelnlz.supabase.co/storage/v1/object/public/fits/${card.id}.png`}
                                    alt="Image"
                                    // fill
                                    width={600}
                                    height={600}
                                    className="rounded-md object-cover h-full "
                                />
                            </div>
                        ))}
                    </section>
                    <section style={{ "--speed": `${speed}ms` }}>
                        {images.map((card, index) => (
                            <div key={index}>
                                <Image
                                    src={`https://ykuaxkboovlonccelnlz.supabase.co/storage/v1/object/public/fits/${card.id}.png`}
                                    alt="Image"
                                    // fill
                                    width={600}
                                    height={600}
                                    className="rounded-md object-cover h-full "
                                />
                            </div>
                        ))}
                    </section>
                    <section style={{ "--speed": `${speed}ms` }}>
                        {images.map((card, index) => (
                            <div key={index}>
                                <Image
                                    src={`https://ykuaxkboovlonccelnlz.supabase.co/storage/v1/object/public/fits/${card.id}.png`}
                                    alt="Image"
                                    // fill
                                    width={600}
                                    height={600}
                                    className="rounded-md object-cover h-full "
                                />
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </>
    );
};

export { Sidescroll };
