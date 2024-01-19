
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'settings',
  description: 'settings pages',
}
export default () => {
  return (
    <>
      <section className="settings-page">
        <h1>Hello, settings Page!</h1>
        <section style={{ height: 600, background: 'green' }} id="a">

        </section>
        <section style={{ height: 600, background: 'red' }} id="b">

        </section>
      </section>
    </>
  )
}