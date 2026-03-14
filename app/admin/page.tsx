"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/lib/authCheck";
import { useEffect } from "react";
import Link from "next/link";


export default function AdminPage() {
    const router = useRouter();
    useEffect(() => {
        checkAuth((user : any) => {
            if (!user) {
                router.push("/login");
            };
        });
    }, [router]);

    const signOutHandler = async() => {
        await signOut(auth);
        router.push("/");
    };
    return (
        <div className="max-w-4xl mx-auto mt-20 px-6">
            <div className="bg-[#020617]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-10 shadow-2xl space-y-10">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-semibold tracking-tight">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage your blog content and settings
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/admin/create" className="admin-card">
                        <h2 className="text-xl font-semibold">
                            Create Post
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                            Write and publish a new article
                        </p>
                    </Link>
                    <Link href="/admin/posts" className="admin-card">
                        <h2 className="text-xl font-semibold">
                            Manage Posts
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                            Edit or delete existing posts
                        </p>
                    </Link>
                </div>
                <div className="flex justify-center">
                    <button onClick={signOutHandler} className="admin-logout text-gray-300">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}