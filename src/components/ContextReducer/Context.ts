import { useRef, useReducer, createContext, ReactNode, Dispatch, useContext  } from "react";

export type Item = {
  id: number;
  title: string;
}
export type State = {
  list: Item[];
  title: string;
}

export const initState = {
  title: '', 
  list: [{
    id: 1, title: 'aaa'
  }]
}



export const Context = createContext<{
  state: State;
  dispatch?: React.Dispatch<Action<any>>
}>({
  state: initState,
});

