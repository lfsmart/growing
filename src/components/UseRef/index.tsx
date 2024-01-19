import { useRef, useState, ReactNode, forwardRef } from "react";

const MyInput = forwardRef<HTMLInputElement>((props, ref) => {
  return <input ref={ref}></input>

})

export const UseRef = () => {
  const ref = useRef(null);
  const handleClick = () => {
    console.log(ref)
  }
  return (
    <>
      <MyInput ref={ref}></MyInput>
      <button onClick={handleClick}>button</button>
    </>
  );
};
