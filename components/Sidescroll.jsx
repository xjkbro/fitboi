"use client";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidescroll = ({ images, speed = "1" }) => {
    let cls = `flex animate-sidescroll w-full h-full`;
    switch (speed) {
        case "1":
            cls = `flex animate-sidescroll1 w-full h-full`;
            break;
        case "2":
            cls = `flex animate-sidescroll2 w-full h-full`;
            break;
        case "3":
            cls = `flex animate-sidescroll3 w-full h-full`;
            break;
        default:
            cls = `flex animate-sidescroll1 w-full h-full`;
            break;
    }
    return (
        <div className="absolute flex">
            <section className={cls}>
                {images.map((card, index) => (
                    <div key={index} className="h-[400px] w-[300px] pr-4">
                        <HoverCard>
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
                                    <h3 className="scroll-m-20 text-normal md:text-lg font-semibold tracking-tight">
                                        @{card.user.metadata.full_name}
                                    </h3>
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
                    </div>
                ))}
            </section>
            <section className={cls}>
                {images.map((card, index) => (
                    <div key={index} className="h-[400px] w-[300px] pr-4">
                        <HoverCard>
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
                                    <h3 className="scroll-m-20 text-normal md:text-lg font-semibold tracking-tight">
                                        @{card.user.metadata.full_name}
                                    </h3>
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
                    </div>
                ))}
            </section>
            <section className={cls}>
                {images.map((card, index) => (
                    <div key={index} className="h-[400px] w-[300px] pr-4">
                        <HoverCard>
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
                                    <h3 className="scroll-m-20 text-normal md:text-lg font-semibold tracking-tight">
                                        @{card.user.metadata.full_name}
                                    </h3>
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
                    </div>
                ))}
            </section>
        </div>
    );
};

export { Sidescroll };
