import { Prompt, Link } from "react-router-dom"

export const MyForm = () => {
  return (
    <div>
      <Prompt message={ '将要离开页面，确认吗？' }></Prompt>
      <h2>表单</h2>
      <input type="text" />
      <Link to="/"> go home</Link>
    </div>
  )
}
