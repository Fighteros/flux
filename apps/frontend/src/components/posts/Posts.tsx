import {Post} from '@/lib/types/modelTypes';
import PostCard from "@/components/posts/PostCard";
import {InformationIcon} from "@/icons/icons";
import Pagination from "@/components/Pagination";

type PostProps = {
    posts: Post[]
    totalPages: number
    currentPage: number
}

type TitleProps = {
    title: string;
}

const TitleWithBottomLine = (props: TitleProps) => {
    const {title} = props;
    return (
        <div>
            <h2 className="text-5xl font-bold text-center text-gray-800 leading-tight">
                {title}
            </h2>

            <div className="h-1 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-96 mb-9 rounded-t-md mt-5"></div>
        </div>
    );
}

const Posts = (props: PostProps) => {
    const {posts, totalPages, currentPage} = props;

    if (!posts || !Array.isArray(posts)) {
        return (
            <div className="flex flex-col items-center justify-center">
                <TitleWithBottomLine title="Latest Posts"/>

                <div className="size-24 mb-10">
                    <InformationIcon/>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No Posts Found</h2>
                {/* Subtext */}
                <p className="text-gray-600 mb-4">
                    It looks like there are no posts available at the moment. Check back later or create a new post!
                </p>
            </div>
        )
    }

    return (
        <section className="container m-8 max-w-5xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-800 leading-tight">
                Latest Posts
            </h2>

            <div className="h-1 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-96 mb-9 rounded-t-md mt-5"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map(post => (<PostCard key={post.id} {...post}/>))}
            </div>

            <Pagination className="mt-4" totalPages={totalPages} currentPage={currentPage}/>
        </section>
    );
}

export default Posts;