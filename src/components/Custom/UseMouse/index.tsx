import { useMouse } from "@/hooks"
import { useEffect, useState } from "react"

export const UseMouse = () => {
  const { pageX, pageY } = useMouse();
  return <>
    <div>pageX: { pageX }px </div>
    <div>pageY: { pageY }px </div>
  </>
}