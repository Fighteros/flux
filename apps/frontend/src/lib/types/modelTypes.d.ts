export type Post = {
    id: number;
    slug: string;
    title: string;
    content: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
}

export type Blog = {
    id: number;
    slug: string;
    title: string;
    content: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
}


export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];
    blogs: Blog[]
}