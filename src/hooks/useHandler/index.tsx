
import { useCallback } from "react"
/**
 * 功能：无状态函数
 */
export const useHandler = (cb: VoidFunction) => {
  return useCallback( cb, []);
} 