export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="dashboard-layout">
      <nav>我是 dashboard layout</nav>
      {children}
    </section>
  )
}
