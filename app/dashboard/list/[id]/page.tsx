
import { Metadata } from "next"
export const generateMetadata = async (props: RouteProps): Promise<Metadata> => {
  return {
    title: `这是详情页-${props.params.id}`,
  }
}
export default ({ params, searchParams }:  RouteProps) => {
  return (
    <div>我是 postList 的 id={ params.id }</div>
  )
}