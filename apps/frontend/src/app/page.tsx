import Hero from "@/components/ui/hero";
import Posts from "@/components/posts/Posts";
import {getPosts} from "@/api/posts/posts";

export default async function Home() {
    const posts = await getPosts();


    return (
        <main>
            <Hero/>
            <Posts posts={posts}/>
        </main>
    );
}
