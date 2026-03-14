"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";


export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginHandler = async (e : any) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin');
        } catch (error) {
            alert("Login Fails. Try Again"); }
        };
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#0f172a]">
            <div className="login-card space-y-6">
                <h1 className="text-3xl font-semibold text-white text-center">
                    Admin Login
                </h1>
                <form onSubmit={loginHandler} className="space-y-4">
                    <input type="email" placeholder="Email" className="login-input" onChange={(e)=>setEmail(e.target.value)} required/>
                    <input type="password" placeholder="Password" className="login-input" onChange={(e)=>setPassword(e.target.value)} required/>
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}