"use client";
import React, { useRef, useState } from "react";

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

// import { createClient } from "@supabase/supabase-js";
import { useFormik } from "formik";

// Create a single supabase client for interacting with your database
type FormValue = {
    handle: string;
    top: string;
    bottom: string;
    hat: string;
    outerwear: string;
    shoes: string;
};

export default function UploadDialog({ supabase }: { supabase: any }) {
    // const supabase = createClient(
    //     process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
    // );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // const uploadedImg = useRef<HTMLInputElement>(null);
    const formik = useFormik({
        initialValues: {
            handle: "",
            top: "",
            bottom: "",
            hat: "",
            outerwear: "",
            shoes: "",
        },
        // onSubmit: (values) => {
        //     alert(JSON.stringify(values, null, 2));
        //     console.log(uploadedImg);
        // },
        onSubmit: handleSubmit,
    });
    async function handleSubmit(values: FormValue) {
        if (selectedFile != null) {
            // Add entry
            const { data } = await supabase
                .from("fits")
                .insert({ handle: values.handle, info: values })
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
            <Alert className="w-1/2 mx-auto fixed bottom-12 z-50 translate-x-1/2 opacity-70 flex justify-between items-center">
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
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                if (!e.target.files) return;
                                                setSelectedFile(
                                                    e.target.files[0]!
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
                                        <Input
                                            id="handle"
                                            className="col-span-3"
                                            {...formik.getFieldProps("handle")}
                                        />
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
