
'use client'
import type { Metadata } from 'next'
import { lazy, Suspense } from 'react'
// export const metadata: Metadata = {
//   title: 'settings',
//   description: 'settings pages',
// }
const AsyncComponent = lazy(() => import('@/components/AsyncComponent'))

export default () => {

  throw new Error( '模拟报错' )
  return (
    <>
      <section className="settings-page">
        <h1>Hello, settings Page!</h1>
        <Suspense fallback={ <div>loading...</div> }>
          <AsyncComponent></AsyncComponent>
        </Suspense>
        <section style={{ height: 600, background: 'green' }} id="a">

        </section>
        <section style={{ height: 600, background: 'red' }} id="b">
        
        </section>
      </section>
    </>
  )
}