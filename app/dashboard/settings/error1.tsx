'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='setting-error'>
      <h2>模拟报错</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
