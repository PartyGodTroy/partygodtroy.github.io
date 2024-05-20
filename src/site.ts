export interface Post{
    title: string;
    description: string;
    tags: string[];
    slug: string;
    featured_img:{ url: string; alt: string; width?: number; height?: number;}
    date: number;
}