import Hero from "@/components/ui/hero";
import Posts from "@/components/posts/Posts";
import {getPosts} from "@/api/posts/posts";


type Props = {
    searchParams: Promise<{ [key: string]: string }>
}

export default async function Home({searchParams}: Props) {
    const {page, limit, sort, content} = await searchParams as { [key: string]: string | undefined };

    const posts = await getPosts({
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 10,
        sort: sort ? sort : 'ASC',
        content: content ? content : ''
    });


    return (
        <main>
            <Hero/>
            <Posts posts={posts}/>
        </main>
    );
}
