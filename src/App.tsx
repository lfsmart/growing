import { ReactNode } from "react";
import { UseRef, UseImperativeHandle, UseEffect } from '@/components';
function App(): ReactNode {
  return (
    <>
      <UseRef></UseRef>
      <UseImperativeHandle></UseImperativeHandle>
      <UseEffect></UseEffect>
    </>
  );
}
export default App;
