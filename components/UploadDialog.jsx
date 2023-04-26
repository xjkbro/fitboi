"use client";
import React, { useEffect, useRef, useState } from "react";

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
// import { createClient } from "@supabase/supabase-js";
import { useFormik } from "formik";
import { useSupabase } from "./providers/supabase-provider";
import { useRouter } from "next/navigation";

export default function UploadDialog({ user, setUser }) {
    const { supabase } = useSupabase();
    const router = useRouter();
    // const [user, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    // const uploadedImg = useRef<HTMLInputElement>(null);
    // console.log(user);
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
            // console.log(data);
            //Upload File and rename to entry id
            if (data) {
                const { data: upload } = await supabase.storage
                    .from("fits")
                    .upload(`${data.id}.png`, selectedFile);
            }
        }
    }
    return (
        <div className="w-full mx-auto">
            <Alert className="w-full md:w-1/2 mx-auto fixed bottom-12 z-50 md:translate-x-1/2 opacity-70 flex justify-between items-center">
                <div>
                    <AlertTitle>Want to upload?</AlertTitle>
                    <AlertDescription>
                        Click the button on the right to upload
                    </AlertDescription>
                </div>
                <div>
                    <Dialog>
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
                        <DialogContent className="sm:max-w-[425px]">
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
                                            onChange={(e) => {
                                                if (!e.target.files) return;
                                                setSelectedFile(
                                                    e.target.files[0]
                                                );
                                            }}
                                            required
                                            className="col-span-3 file:text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="handle"
                                            className="text-right"
                                        >
                                            Handle
                                        </Label>
                                        {/* <Input
                                            id="handle"
                                            className="col-span-3"
                                            {...formik.getFieldProps("handle")}
                                        /> */}
                                        {user ? (
                                            <span className="flex col-span-3 items-center gap-3 text-sm">
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
                                            <Button
                                                className="flex col-span-3 items-center gap-3 text-sm"
                                                onClick={(e) =>
                                                    signInWithGoogle(e)
                                                }
                                            >
                                                {/* <Mail className="mr-2 h-4 w-4" />{" "} */}
                                                Sign In with Google
                                            </Button>
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
