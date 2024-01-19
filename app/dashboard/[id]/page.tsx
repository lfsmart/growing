
export default ({ params, searchParams }:  RouteProps) => {
  // 在客户端需要使用 useParams 和 useSearchParams 两个钩子函数
  return (
    <div>我是 postList 的 id={ params.id }</div>
  )
}