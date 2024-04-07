export const init = (payload: any) => {
  console.log(payload)
  return {
    type: 'COMMON/INIT',
    payload,
  }
}

export const initAsync =
  (data: any) => (dispath: Function, getState: Function) => {
    const {
      common: { initData },
    } = getState()
    setTimeout(() => {
      dispath(
        init({
          name: 'lantian2',
          age: ++initData.age,
        })
      )
    }, 1000)
  }
