export interface PostProps {
    id: string;
    text: string;
    pictures: string | null;
    createdAt?: Date;
    updatedAt: Date;
    author: string | null;
    category: string | null;
    title: string;
}
