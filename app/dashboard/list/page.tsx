
import { Metadata } from "next";
import { List } from "./_components/List";

export const metadata: Metadata = {
  title: '这是列表',
  description: '这是一个使用了next输出的列表页',
  keywords: 'next.js,react'
}

export default () => {
  return (
    <div className="list-page">
      <List></List>
    </div>
  )
}