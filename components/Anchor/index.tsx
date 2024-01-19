import Link from "next/link";
/**
 * 功能：直接跳转到 setting 页面，并锚点到 #b, 可以通过 属性 scroll 控制是否动动页面
 */
export const Anchor = () => {
  return <Link href="/dashboard/settings#b">Settings</Link>
}