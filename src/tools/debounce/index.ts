export const debounce = (
  fn: ReturnTypeVoid,
  wait: number,
  context?: object
): ReturnTypeVoid => {
  let timerId: OrNull<number> = null
  return (...args) => {
    typeof timerId == 'number' && clearTimeout(timerId)
    timerId = window.setTimeout(() => {
      fn.apply(context || null, args)
    }, wait)
  }
}

debounce(() => {}, 1000)
