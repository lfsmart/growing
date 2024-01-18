'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const Links = () => {
  const pathname = usePathname();
  console.log( pathname, '---' );

  return (
    <nav>
      <ul>
        <li>
          <Link className={`link ${pathname === '/' ? 'active' : ''}`} href='/'>
            Home
          </Link>
        </li>
        <li>
          <Link className={`link ${pathname === '/about' ? 'active' : ''}`} href='/about'>
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}
