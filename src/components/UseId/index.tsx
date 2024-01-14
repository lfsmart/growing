import { useId } from "react";

const Password = () => {
  const password = useId();
  return <>
    <label>
      密码：
      <input type="password" aria-describedby={ password } />
    </label>
    <p id={ password }>密码应该包含至少 18 个字符</p>
  </>
}

export const UseId = () => {
  return (
    <>
      <Password />
      <Password />
    </>
  );
};
