export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>我是 dashboard layout</nav>
      {children}
    </section>
  )
}
