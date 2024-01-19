import Link from 'next/link'
import { PostList, Links, Anchor, Scroll } from '@/components'
export default () => {
  const postData = [
    { id: 1, slug: 'aaa', title: 'aaa' },
    { id: 2, slug: 'bbb', title: 'bbb' },
    { id: 3, slug: 'ccc', title: 'ccc' },
  ]


  return (
    <section className='app-page'>
      <div>Hello,Home Page</div>
      <Link href='/dashboard'>GO Dashboard</Link>
      <PostList posts={postData}></PostList>
      <Links />
      <Anchor />
      <Scroll />
    </section>
  )
}
