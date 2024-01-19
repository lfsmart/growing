export default ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="dashboard-template">
      <nav>我是 dashboard template</nav>
      {children}
    </section>
  )
}
