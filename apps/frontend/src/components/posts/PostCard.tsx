import {Post} from "@/lib/types/modelTypes";
import Image from 'next/image';

type PostCardProps = Partial<Post>

const PostCard = ({id, title, slug, content, createdAt, image, author, updatedAt}: PostCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-60 ">
                {image && <Image src={image} alt={title ?? "thumbnail"} fill/>}
            </div>
            <div className="p-6">
                <h3 className="text-lg font-bold mt-4 break-words text-center text-gray-600">{title}</h3>
                <p className="mt-2 text-gray-500 text-sm">{new Date(createdAt ?? "").toLocaleDateString()}</p>
                <p>{content?.slice(0, 100)}...</p>
            </div>
        </div>
    );
}

export default PostCard;