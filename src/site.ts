export interface Post{
    title: string;
    description: string;
    tags: string[];
    slug: string;
    external_link?: string
    featured_img:{ url: string; alt: string; width?: number; height?: number;}
    date: number;
    // for htmx
    boosted: boolean;
    hidden?:boolean
}