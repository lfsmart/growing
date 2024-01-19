export default ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="admin-group-layout" style={{ background: 'red', color: 'white'}}>
      <nav>我是 (admin) 分组下面分组路由</nav>
      {children}
    </section>
  )
}
