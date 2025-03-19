import {getPostById} from "@/api/posts/posts";
import Image from 'next/image';



type PostProps = {
// access params from rout
    params: {
        id: string
    }
};

const PostPage = async (props: PostProps) => {
    const postId = (props.params).id;

    const post = await getPostById(+postId);


    return (
        <main className="container mx-auto px-4 py-8 mt-36">
            <h1 className="capitalize text-4xl font-bold mb-4 text-slate-700 ">{post.title}</h1>
            <p className="text-slate-600 text-sm mb-4 ">
                By {post.author.first_name + ' ' + post.author.last_name} | {new Date(post.createdAt).toLocaleDateString()}</p>

            <div className="relative w-300 h-120">
                {post.image && post.image !== '' &&
                    <Image
                        src={post.image} alt={post.title}
                        // width={1000}
                        // height={500}
                        fill
                        className="rounded-md object-cover"
                    />}
            </div>


            <div className="text-xl text-normal  pt-10" dangerouslySetInnerHTML={{__html:post.content}}  />

        </main>
    );
}
export default PostPage;