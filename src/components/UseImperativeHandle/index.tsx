import { useRef, useState, ReactNode, forwardRef, useImperativeHandle } from "react";

const MyInput = forwardRef(( props, ref ) => {
  const inputRef = useRef<OrNull<HTMLInputElement>>(null)
  useImperativeHandle( ref, () => ({
      focus(){
        inputRef?.current?.focus()
      }
    }) 
  );
  return <input ref={ inputRef }></input>
})

export const UseImperativeHandle = () => {
  const ref = useRef<OrNull<HTMLInputElement>>( null );
  const handleClick = () => {
    ref.current?.focus() // 子组件获取焦点
  }

  return (
    <>
      <MyInput ref={ ref }></MyInput>
      <button onClick={ handleClick }>button</button>
    </>
  );
};
