/**
 * global declaration
 */

type OrNull<T> = T | null

// 签名索引
interface Json {
  [index: string]: any
}

interface Window {
  _REDUX_DEVTOOLS_EXTENSION_: Function
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
}

// store state 数据声明
type RootState = ReturnType<typeof import('@/store').getState>

interface VoidFunction {
  (...args: any[]): void
}
