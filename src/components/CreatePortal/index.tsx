import { createPortal } from "react-dom"

export const CreatePortal = () => {
  return <>
    { createPortal(<p>我是 createPortal </p>, document.querySelector('#root')! ) }
  </>
}