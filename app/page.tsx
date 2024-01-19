import Link from 'next/link'
import { PostList, Links, Anchor, Scroll } from '@/components'
export default () => {
  return (
    <section className='app-page'>
      <div>Hello,Home Page</div>
      <Link href='/dashboard'>GO Dashboard</Link>
      <Links />
      <Anchor />
      <Scroll />
    </section>
  )
}
