import { ReactNode } from "react";
import { 
  UseRef, UseImperativeHandle, UseEffect, UseLayoutEffect, 
  UseInsertionEffect, UseReducer, UseContext, ContextReducer, 
  Memo, UseMemo, UseCallback, StartTransition, UseTransition,
  UseDeferredValue, UseId, Custom 
} from '@/components';

function App(): ReactNode {
  return (
    <>
      {/* <UseRef></UseRef> */}
      {/* <UseImperativeHandle></UseImperativeHandle> */}
      {/* <UseEffect></UseEffect> */}
      {/* <UseLayoutEffect></UseLayoutEffect> */}
      {/* <UseInsertionEffect></UseInsertionEffect> */}
      {/* <UseReducer></UseReducer> */}
      {/* <UseContext></UseContext> */}
      {/* <ContextReducer></ContextReducer> */}
      {/* <Memo></Memo> */}
      {/* <UseMemo></UseMemo> */}
      {/* <UseCallback></UseCallback> */}
      {/* <StartTransition></StartTransition> */}
      {/* <UseTransition></UseTransition> */}
      {/* <UseDeferredValue></UseDeferredValue> */}
      {/* <UseId></UseId> */}
      <Custom.UseMouse></Custom.UseMouse>
    </>
  );
}
export default App;
