import { PostList } from '@/components'
export default function Page() {
  const postData = [
    { id: 1, slug: 'aaa', title: 'aaa' },
    { id: 2, slug: 'bbb', title: 'bbb' },
    { id: 3, slug: 'ccc', title: 'ccc' },
  ]
  return (
    <>
      <section className='dashboard-page'>
      <PostList posts={postData}></PostList>
        <h1>Hello, Dashboard Page!</h1>
      </section>
    </>
  )
}
