import Link from "next/link";

interface Item{
  id: number;
  slug: string;
  title: string;
}

export const PostList = ({ posts }: { posts: Item[]}) => {
  return (
    <ul>
      {
        posts.map(post => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li> )
        )
      }
    </ul>
  )
}