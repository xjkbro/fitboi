"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFormik } from "formik";
import { useSupabase } from "./providers/supabase-provider";
import { useRouter } from "next/navigation";

export default function UploadDialog({ user, setUser, setImages }) {
    const { supabase } = useSupabase();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const formik = useFormik({
        initialValues: {
            handle: "",
            top: "",
            bottom: "",
            hat: "",
            outerwear: "",
            shoes: "",
        },
        onSubmit: handleSubmit,
    });
    useEffect(() => {
        async function getUser() {
            const { data } = await supabase.auth.getUser();
            if (data.user) setUser(data.user);
        }
        getUser();

        window.addEventListener("keydown", (e) => {
            // console.log(e.key);
            if (e.key === " ") {
                setOpen(true);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    async function signInWithGoogle(e) {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        setUser(user);
        router.refresh();
        router.replace("/");
    }

    async function handleSubmit(values) {
        if (user != null && selectedFile != null) {
            // Add entry
            const { data } = await supabase
                .from("fits")
                .insert({ user: user.id, info: values })
                .select()
                .single();
            //Upload File and rename to entry id
            if (data) {
                const { data: upload } = await supabase.storage
                    .from("fits")
                    .upload(`${data.id}.png`, selectedFile);
            }
            const { data: imgs } = await supabase
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
                .limit(20);
            if (imgs) setImages(imgs);

            formik.setFieldValue("handle", "");
            formik.setFieldValue("top", "");
            formik.setFieldValue("bottom", "");
            formik.setFieldValue("hat", "");
            formik.setFieldValue("outerwear", "");
            formik.setFieldValue("shoes", "");
            setSelectedFile(null);
            setOpen(false);
        }
    }
    return (
        <div className="w-full mx-auto">
            <Alert className="w-full md:w-1/2 mx-auto fixed bottom-12 z-50 md:translate-x-1/2 opacity-70 flex justify-between items-center">
                <div>
                    <AlertTitle>Want to share you fit?</AlertTitle>
                    <AlertDescription>
                        Press Space or click the button on the right to share
                        your fit.
                    </AlertDescription>
                </div>
                <div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
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
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[425px] md:max-w-[625px]">
                            <form onSubmit={formik.handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Upload</DialogTitle>
                                    <DialogDescription>
                                        Fill out the form and upload a file to
                                        have it submitted for review
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="image"
                                            className="text-right"
                                        >
                                            Image
                                        </Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (!e.target.files) return;
                                                setSelectedFile(
                                                    e.target.files[0]
                                                );
                                            }}
                                            required
                                            className="col-span-3 file:bg-white file:rounded-sm file:mr-2 hover:file:bg-slate-200 file:cursor-pointer transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-8 items-center gap-4">
                                        <Label
                                            htmlFor="handle"
                                            className="text-right col-span-2"
                                        >
                                            Handle
                                        </Label>
                                        {user ? (
                                            <span className="flex col-span-6 items-center gap-3 text-sm">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={
                                                            user.user_metadata
                                                                .avatar_url
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {user.user_metadata.full_name
                                                            .toUpperCase()
                                                            .substr(0, 1)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {user.user_metadata.full_name}
                                            </span>
                                        ) : (
                                            <>
                                                <Button
                                                    className="flex col-span-6 items-center gap-3 text-sm"
                                                    onClick={(e) =>
                                                        signInWithGoogle(e)
                                                    }
                                                >
                                                    Sign In with Google
                                                </Button>
                                                {/* <Button
                                                    className="flex col-span-3 items-center gap-3 text-sm"
                                                    onClick={(e) =>
                                                        signInWithGoogle(e)
                                                    }
                                                >
                                                    Sign In with Twitter
                                                </Button> */}
                                            </>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="top"
                                            className="text-right"
                                        >
                                            Top:
                                        </Label>
                                        <Input
                                            type="text"
                                            id="top"
                                            className="col-span-3"
                                            {...formik.getFieldProps("top")}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="bottom"
                                            className="text-right"
                                        >
                                            Bottom:
                                        </Label>
                                        <Input
                                            type="text"
                                            id="bottom"
                                            className="col-span-3"
                                            {...formik.getFieldProps("bottom")}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="outerwear"
                                            className="text-right"
                                        >
                                            Outerwear:
                                        </Label>
                                        <Input
                                            type="text"
                                            id="outerwear"
                                            className="col-span-3"
                                            {...formik.getFieldProps(
                                                "outerwear"
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="hat"
                                            className="text-right"
                                        >
                                            Hat:
                                        </Label>
                                        <Input
                                            type="text"
                                            id="hat"
                                            className="col-span-3"
                                            {...formik.getFieldProps("hat")}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="hat"
                                            className="text-right"
                                        >
                                            Shoes:
                                        </Label>
                                        <Input
                                            type="text"
                                            id="shoes"
                                            className="col-span-3"
                                            {...formik.getFieldProps("shoes")}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Upload</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </Alert>
        </div>
    );
}
