"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";

export default function EditPost() {
    const params = useParams();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    useEffect(() => {
        const load = async() => {
            const ref = doc(db,"posts",params.id as string);
            const posts = await getDoc(ref);
            const data:any = posts.data();
            setTitle(data.title);
            setContent(data.content);
        };
        load();
    },[params.id]);
    const updatePost = async()=>{
        await updateDoc(doc(db,"posts",params.id as string),{
            title,
            content
        });
    alert("Post updated successfully");
    router.push("/admin/posts");
    };
    return(
    <div className="max-w-3xl mx-auto mt-16 px-6">
        <div className="bg-[#020617]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
                <h1 className="text-4xl font-semibold tracking-tight">
                    Edit Post
                </h1>
                <p className="text-gray-400 text-sm">
                    Update your article content and save changes
                </p>
            </div>
            <input value={title} className="blog-input" placeholder="Post title" onChange={(e)=>setTitle(e.target.value)}/>
            <div data-color-mode="dark" className="rounded-xl overflow-hidden">
                <MDEditor value={content} onChange={(val)=>setContent(val || "")}/>
            </div>
            <div className="flex justify-end gap-3">
                <button onClick={()=>router.push("/admin/posts")} className="px-5 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900 transition">
                    Cancel
                </button>
                <button onClick={updatePost} className="blog-btn text-white">
                    Update Article
                </button>
            </div>
        </div>
    </div>
    );
}