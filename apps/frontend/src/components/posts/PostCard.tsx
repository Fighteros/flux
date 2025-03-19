import {Post} from "@/lib/types/modelTypes";
import Image from 'next/image';
import Link from "next/link";

type PostCardProps = Partial<Post>

const PostCard = ({id, title, slug, content, createdAt, image, author, updatedAt}: PostCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative h-50 ">
                {image && <Image src={image} alt={title ?? "thumbnail"} fill/>}
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <div className="p-6">
                    <h3 className="text-lg font-bold mt-4 break-words text-center text-gray-600">{title}</h3>
                    <p className="mt-2 text-gray-500 text-sm">{new Date(createdAt ?? "").toLocaleDateString()}</p>
                    <p>{content?.slice(0, 100)}...</p>
                    <Link className="text-indigo-600 hover:underline mt-auto text-right block"
                          href={`/post/${slug}/${id}`}>Read more</Link>
                </div>
            </div>
        </div>
    );
}

export default PostCard;