'use client'
import { useRouter, redirect, RedirectType } from 'next/navigation'
import Link from 'next/link';

export const Scroll = () => {
  const router = useRouter();
  const handleClick = () => {
    console.log( redirect, 1111);
    redirect( '/dashboard/settings#b' );
  }
  return (
    <>
      <div><button onClick={ handleClick } className='text-red-800'>go settings(hook)</button></div>
      <div><Link href="/dashboard/settings#b" scroll={ false }>go settings(Link)</Link></div>
    </>
  )
}