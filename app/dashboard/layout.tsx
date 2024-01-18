export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>我是导航 layout</nav>
      {children}
    </section>
  )
}
