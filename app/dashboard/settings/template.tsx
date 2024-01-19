export default ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="settings-template">
      <nav>我是 setting 下的 template</nav>
      {children}
    </section>
  )
}
