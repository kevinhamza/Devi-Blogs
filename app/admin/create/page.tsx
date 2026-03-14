"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/lib/authCheck";
import { useEffect } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import MDEditor from "@uiw/react-md-editor";

export default function CreatePost() {
        const router = useRouter();
        useEffect(() => {
            checkAuth((user : any) => {
                if (!user) {
                    router.push("/login");
                };
            });
        }, [router]);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");

    const createPost = async () => {
        await addDoc(collection(db, "posts"),{
            title,
            slug,
            excerpt,
            content,
            author : "admin",
            createdAt : Timestamp.now(),
            publish : true
        });

        alert("Post Created");
        router.push("/blog");
    };
    return(
        <div className="max-w-3xl mx-auto mt-16 px-6">
        <div className="bg-[#020617]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight">
                Create Post
            </h1>
            <p className="text-gray-400 text-sm">
                Write and publish a new article for your blog
            </p>
        </div>
        <input type="text" placeholder="title" className="blog-input" onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder="slug" className="blog-input" onChange={(e) => setSlug(e.target.value)}/>
        <input type="text" placeholder="excerpt" className="blog-input"onChange={(e) => setExcerpt(e.target.value)}/>
        <div data-color-mode="dark" className="rounded-xl overflow-hidden">
            <MDEditor value={content} onChange={(val)=>setContent(val || "")}/>
        </div>
        <div className="flex justify-end">
            <button onClick={createPost} className="blog-btn text-white">
                Publish Article
            </button>
        </div>
    </div>
</div>
);
}