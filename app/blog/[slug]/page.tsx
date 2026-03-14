import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReactMarkdown from "react-markdown";


type props = {
    params: Promise<{ slug: string }>;
};

async function getPost(slug : string) {
    const getPosts = await getDocs(collection(db, "posts"));
    let post: any = null;
    getPosts.forEach((doc) => {
        const data = doc.data()
        if (data.slug === slug) {
            post = data;
        };
    });
    return post;
};

export default async function BlogPost({params} : props ) {
    const { slug } = await params;
    const post = await getPost(slug);
    
    if (!post) {
        return <div>Post not Found</div>;
    };
    return(
        <div className="blog-article">
            <div className="space-y-6">
                <h1 className="text-white">
                    {post.title}
                </h1>
                <div className="border-b border-gray-800"></div>
                <div className="blog-markdown">
                    <ReactMarkdown>
                        {post.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}