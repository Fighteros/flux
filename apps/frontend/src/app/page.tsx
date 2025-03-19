import Hero from "@/components/ui/hero";
import Posts from "@/components/posts/Posts";
import {getPosts} from "@/api/posts/posts";


type Props = {
    searchParams: Promise<{ [key: string]: string }>
}

export default async function Home({searchParams}: Props) {
    const {page} = await searchParams as { [key: string]: string | undefined };


    const posts = await getPosts({page: page ? +page : 1});

    // console.log(posts);

    return (
        <main>
            <Hero/>
            <Posts posts={posts.data} currentPage={page ? +page : 1} totalPages={Math.ceil(posts.total / 10)}/>
        </main>
    );
}
