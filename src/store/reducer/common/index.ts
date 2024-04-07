
const INITIAL_STATE = {
  initData: {
    name: [],
    age: 18
  }
}




type Action = {
  [ key: string]: any;
  type: string
}

export default ( state=INITIAL_STATE, action: Action ) => {
  const { type, payload } = action;
  switch( type ){
    case 'COMMON/INIT': return {
      ...state,
      initData: {
        ...payload
      }
    }
    default: return state
  }
}