'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Item{
  id: number;
  slug: string;
  title: string;
}

export const PostList = ({ posts }: { posts: Item[]}) => {
  const pathname = usePathname();
  return (
    <ul>
      {
        posts.map(post => (
          <li key={post.id}>
            <Link href={`${pathname}/${post.id}`}>{post.title}</Link>
          </li> )
        )
      }
    </ul>
  )
}