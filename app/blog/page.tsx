import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

async function GetPosts() {
    const fetchData = await getDocs(collection(db, "posts"));
    const post: any[] = [];
    fetchData.forEach((doc) => {
        post.push({
            id: doc.id,
            ...doc.data(),
        });
    });
    return post;
};
export default async function BlogPage() {
    const posts = await GetPosts();
    return (
        <div className="max-w-5xl mx-auto mt-16 px-6 space-y-12">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white">
                    Blog
                </h1>
                <p className="text-gray-400">
                    Read all articles and tutorials
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post:any) => (
                    <div key={post.id} className="blog-card">
                        <h2>{post.title}</h2>
                        <p>{post.excerpt}</p>
                        <Link href={`/blog/${post.slug}`}>
                            Read more →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}