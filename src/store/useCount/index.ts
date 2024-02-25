import { create } from 'zustand'

// 计数模块状态管理
type State = {
  count: number;
  role?: string;
}

type ActionType =  {
  type: string;
  payload?: string | number | Array<any> | object;
}

type Actions = {
  dispatch: (action: ActionType) => void;
  dispatchAdd: (payload: number) => void;
}

export const useCount = create<State & Actions>((set) => ({
  count: 0,
  role: 'admin',
  dispatchAdd: payload => {
    set( state => ({ count: state.count + payload }) );
  },
  dispatch: action => {
    const { type, payload } = action;
    switch( type ){
      case 'add': set( state => ({ count: state.count + 1 }) ); break;
      case 'reset': set({ count: 0 }); break;
      case 'sub': set( state => ({ count: state.count - 1 }) ); break;
    }
  }
}));