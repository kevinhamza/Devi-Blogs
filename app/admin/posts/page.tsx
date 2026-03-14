"use client"
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";import Link from "next/link";


export default function AdminPost() { 
    const [posts, setPost] = useState<any[]>([]);

    const loadPost = async () => {
        const postsCollect = await getDocs(collection(db,"posts"));
        const list:any[] = [];
        postsCollect.forEach((docu) =>{
            list.push({
                id : docu.id,
                ...docu.data()
            });
        });
        setPost(list);
    };
    useEffect(() => { loadPost(); },[]);
    
    const removePost = async(id : string) => {
        await deleteDoc(doc(db, "posts", id));
        loadPost();
    };
    return(
        <div className="max-w-4xl mx-auto mt-16 px-6 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight">
                        Manage Posts
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Create, edit or delete blog articles
                    </p>
                </div>
                <Link href={"/admin/create"} className="blog-btn text-white">
                    Create Post
                </Link>
            </div>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="admin-post">
                        <div>
                            <h2 className="text-lg font-medium">
                                {post.title}
                            </h2>
                            <p className="text-sm text-gray-400">
                                /{post.slug}
                            </p>
                        </div>
                        <div className="flex gap-5 text-sm">
                            <Link href={`/admin/edit/${post.id}`} className="admin-link">
                                Edit
                            </Link>
                            <button onClick={()=>removePost(post.id)} className="admin-delete">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}