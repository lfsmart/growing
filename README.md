# 学习笔记

​	课程主要使用 react 18 和和 vite 构建工具构建项目。

## 1. 安装

​	执行如下命令，按照提示选择即可。

```bash
npm init vite@5.0.8
```

​	在配置文件中使用了别名配置，在 `vite.config.ts` 中配置如下：

```tsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

​	由于在 ts 中使用了 node 模块 path，因此需要安装 node 类型约束声明系统，按照 ts 类型发布的规则，通常报名为 `@types/<pkgname>` 安装如下：

```bash
npm i -D @types/node 
```

![image-20240104230808370](https://raw.githubusercontent.com/lfsmart/images/master/img/image-20240104230808370.png)

## 2. 严格模式

​	如下所示使用了组件 `React.StrictMode` 属于严格模式，仅是用于方便发现在开发过程中的问题，如 useEffect 调用性能问题等和其他的用法错误等。

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## 3. 样式

### 3.1 classnames

​	classnames 模块用于处理复杂的样式类名，无论是全局样式或局部样式均可以通过 classnames 模块设置样式

```tsx
import style from './assets/index.module.css'
import classnames from 'classnames';
function App() {
  const myCalss = classnames({
    class1: true,
    class2: true,
    [style.headerTitle]: true
  })
  return (
    <div className="card">
      <button className={ myCalss }>
        count is {count}
      </button>
    </div>
  )
}
```

- CSS-in-JS
- Tailwind CSS 

## 4. react 事件

​	**合成事件：**react 使用合成事件，可以通过 nativeEvent 获取原生的事件数据。合成事件与原生事件基本一致，但也有区别。合成事件的主要目的是为了解决不同的浏览器之间事件兼容性问题。

​	**事件委托：**react 事件是通过事件委托的方式实现的，最终的是都是被委托到了根容器上，也就是组件挂载的根元素的容器上。

​	**事件传参**：事件传参可以通过高阶函数，也可以通过箭头函数。

```tsx
import { useState } from 'react'
function App() {
  const handleClick1 = () => {}
  const handleClick2 = () => (e:) => {}
  return (
    <div className="card">
      <button onClick={ () => handleClick1 ( 'handleClick1' ) }> btn1 </button>
      <button onClick={ handleClick2( 'handleClick2' ) }> btn2 </button>
    </div>
  )
}
```

| 事件类型 | 事件接口类型  | 备注             |
| -------- | ------------- | ---------------- |
| click    | MouseEvent    |                  |
| change   | ChangeEvent   | 兼容所有事件接口 |
| focus    | FocusEvent    |                  |
| blur     | FocusEvent    |                  |
| input    | FormEvent     |                  |
| keyDown  | KeyboardEvent |                  |
| keyUp    | KeyboardEvent |                  |

## 5. 渲染

- **条件语句**：if、elese
- **条件运算符**：?:
- **逻辑运算符**：&&、||
- **循环语句**：for、while，将 list 数据平铺到渲染，需要为每一项数据加 key，通过 key 值 React 可以方便 diff 算法的数据比对，从而做最小开销的 dom 操作渲染 

注意：boolean、空字符串、null、undefined、对象，函数等不会渲染，可以通过 `JSON.stringify` 函数转换成字符串。渲染的是值，不能是表达式。react 在渲染状态数据的时候，需要是一个新对象。

## 6. 组件书写

方式一：

```tsx
const Parent = {
  Com1() {
    return <div>com1</div>;
  },
  Com2() {
    return <div>com2</div>;
  },
}
const { Com2 } = Parent;
const App = () => {
  return (
    <>
      <Parent.Com1></Parent.Com1>
      <Com2></Com2>
    </>
  );
}
```

方式二：

```tsx
const Parent = () => <div>hello Parent</div>;
Parent.Com1 = () => <div>hello Com1</div>;

const { Com1 } = Parent;
function App() {
  return (
    <>
      <Parent />
      <Com1 />
    </>
  );
}
```

## 7. 组件通信

​	react 通过属性的方式向子组件传递任意数据，包括函数、JSX 组件等。如果需要传子组件，则需要将组件写在父组件标签内。总体上 react 传递数据比 vue 要方便的多，可以传递任意数据，也没有 vue 中组件作用域的繁杂传参逻辑。

### 7.1 传子组件

```tsx
interface {
  children?: ReactNode;
  getData: (data: string) => void;
}
const Parent = ({ children, getData }) => {
  getData('我被执行了');
  return <div>hello Parent。{ children }</div>;
}

const userInfo = {
  name: 'lantian',
  age: 10,
  sex: 0
}
const getData = (data: string) => {
  console.log( data, '子组件调用了' ) 
}
const { Com1 } = Parent;
function App() {
  return (
   <Parent>
   	<div 
        getData={ getData } 
        el={ <div>我是element</div> }
        { ...userInfo }
     >hello slot</div>
   </Parent>
  )
}
```

### 7.2 组件默认值

​		在 react 中传递默认值，在父组件不传参数时，需要设置默认值。一种使用 es6 的方式设置默认值，另一种通过 defaultProps 的方式定义默认值。

**方式一：**通过 es6 的方式赋默认值。

```tsx
function Welcome({ count = 0 }){
  return <>{count}</>
}
```

**方式二：**通过组件的默认属性 defaultProps 定义属性默认值。数据不复杂不建议使用这种方式定义数据默认值。

```tsx
const Welcome = (props) => {
  return <div>
    hello Welcome
    { count }
  </div>
}

Welcome.defaultProps = {
  count: 0
}
```

### 7.3 限定数据类型

​	限定数据的类型，定义 props 传来的数据类型，建议直接使用 ts 的方式限定数据类型。如果采用的是 javascript 的方式，需要使用 PropTypes 的方式设置数据类型。需要安装第三方模块 `prop-types` 模块。

```bash
npm i -D prop-types
```

​	安装完成后在组件中引入，并制定数据类型即可：

```tsx
import ProsTypes from 'prop-types';
const Welcome = (props) => {
  return <div>
    hello Welcome
    { count }
  </div>
}
Welcome.PropTypes = {
  count: ProsTypes.number
}
```

​	ProsTypes 支持的数据类型，更多应用可以查看， [官方网站](https://github.com/facebook/prop-types) 。

| 数据类型 | 语法              |
| -------- | ----------------- |
| number   | ProsTypes.number  |
| boolean  | ProsTypes.boolean |

## 8. 纯函数

​	组件必须是一个纯函数，只负责自己的任务，他不会更改在该函数调用前就存在的对象或变量。输入相同，则输出相同，给定相同的输入，纯函数会返回固定的结果，满足一一对应关系，结果可预测。`React.StrictMode` 通过调用两次函数组件，如果两次输出的结果一致则是纯函数，反之不是。

## 9. 状态管理

​	随时间的变化的数据成为状态（state），状态是可以进行数据驱动视图的，而普通变量是不行驱动视图更新，注意更新视图需要一个纯状态，也及时需要创建显得状态变量数据。useState 钩子函数可以创建状态变量和改变状态的函数，改变状态在 class 模式中必须调用 setState 方法才能改变数据状态并驱动视图更新，普通变量不会触发 render 的函数。

​	状态是如何改变视图的，渲染与提交的过程（三个步骤）：

​	步骤1：触发一次渲染，组件的初次渲染，createRoot().render()

​	步骤2：在进行初次渲染时，React 会调用根组件内部状态更新，会渲染对应的函数组件

​	步骤3：初次渲染 appendChild() DOM API 内部状态更新，更新差异的 DOM 节点。

### 9.1 useState 工作原理

1. **声明状态变量**： 当在函数组件中调用 `const [state, setState] = useState(initialValue)` 时，React会创建一个新的状态变量 `state` 和一个用于更新该状态的函数 `setState`。
2. **初始化状态**： 在组件首次渲染时（即挂载阶段），React会根据提供的 `initialValue` 创建并初始化这个状态。
3. **状态更新**： 当调用 `setState(newState)` 时，React 不会立即修改当前的状态值，而是将新的状态和一个更新函数放入一个队列中。在下一个事件循环中，React 会重新执行该组件，此时会使用新状态进行渲染，并通过虚拟DOM算法计算出实际需要更新的DOM部分，从而更新界面。
4. **多个状态管理**： 如果在同一个组件内多次调用 `useState`，React 使用内部机制来确保每个状态都独立存储，不会互相覆盖。在React源码实现中，这些状态被组织在一个类似链表的数据结构中，以便正确追踪每个Hook的**顺序**和**关联**状态。

### 9.2 状态快照

​	state 变量看起来和一般的 javascript 对象类似，但 state 在其表现出的特殊上更像是一张快照。设置它不会更改已有的 state 变量，但会触发重新渲染。

```tsx
import { useState, ReactNode, useEffect } from "react";
function App(): ReactNode {
  const [ count, setCount ] = useState( 0 );
  const handleClick = () => {
    setCount( () => count + 1 );
    setCount( () => count + 1 );
  	console.log( count, '---setCount---' );
  }
  useEffect( () => {
    console.log( count, '---count---' );
  }, [ count ])
  return (
    <div className="card" onClick={ () => handleClick() }>
      count, { count } 
    </div>
  );
}
export default App;
```

​	如上所示在连续多次调用同一个状态函数后，react 内部已经做了合并处理，在未触发 render 之前状态并为改变，只有在 render 之后才能拿到最新的数据状态。因此如果想获取最终的改变后的数据状态需要在 useEffect 钩子中实现。

```tsx
import { useState, ReactNode, useEffect } from "react";
function App(): ReactNode {
  const [ count, setCount ] = useState( 0 );
  const handleClick = () => {
    // 通过这种方式获取函数内的状态数据 count 的值
    setCount( (count) => count + 1 ); 
    setCount( (count) => count + 1 );
  }
  useEffect( () => {
    console.log( count, '---count---' );
  }, [ count ])
  return (
    <div className="card" onClick={ () => handleClick() }>
      count, { count } 
    </div>
  );
}
export default App;
```

### 9.3 状态队列与自动批处理

​	React 会等待事件处理函数中的所有代码执行完毕再处理 state 更新，队列都执行完成后，执行 render 更新 UI，自动批处理。在 react 内部实现了 nextTick 的功能，按时间帧执行。

```tsx
import { useState, ReactNode, useEffect } from "react";
function App(): ReactNode {
  const [ count, setCount ] = useState( 0 );
  const handleClick = () => {
    setCount( (preState) => preState + 1 );
    setCount( (preState) => preState + 1 );
    setTimeout( () => {
      console.log( count );
    }, 2000);
  }
  useEffect( () => {
    console.log( count, '---count---' );
  }, [ count ])
  return (
    <div className="card" onClick={ () => handleClick() }>
      count, { count } 
    </div>
  );
}
export default App;
```

### 9.4 状态的不变性

​	在 react 中状态是不可以被直接改变的必须通过状态方法改变，这与 vue 有很大不同。另外，直接改变数据，如果两次值不发生变化不会触发 render 函数，因此如果使用了引用类型，修改引用类型之后再去通过状态函数改变状态，则无法更新视图。如下所示：

```tsx
import { useState, ReactNode } from "react";
function App(): ReactNode {
  const [ list, setList ] = useState([
     id: '1',
     text: 'aaa'
  ]);  
  const handleClick = () => {
    list.push({
        id: '2',
        text: 'bbb'
    }); // 是同一个数据，list 并没有改变
    setList( list );
  } 
  return (
    <div className="card">
      { list.map( item => <li>{ item.text }</li>) }
      <button onClick={ handleClick }> add </button>
    </div>
  );
}
export default App;
```

### 9.5 解决状态不可变性

- 不直接操作原始对象数据，通过数组和对象的方法，如数组方法 filter/reduce/map 等均是产生一个新的列表对象
- 通过 lodash 中的深拷贝方法，对原始对象拷贝，但是这种方式耗性能。

​	为了解决深拷贝的性能问题，使用第三方模块 use-immer 库。通过 use-immer 库可以可以直接操作 draft 参数。 

```bash
npm i -D use-immer
```

​	如下所示：使用 useImmer 替代 useState 方法，然后就可以直接操作改变状态的函数参数。一般情况下不建议采用 useImmer 的方式，可能会带来副作用。

```tsx
import { ReactNode, useEffect } from "react";
import { useImmer } from 'use-immer';
function App(): ReactNode {
  const [ list, setList ] = useImmer([{
    id: 1, text: 'aaa'
  }]);
  const handleClick = () => {
    setList( (draft) => { // 直接更改 draft，通过 Proxy 代理实现对属性的监听
      draft.push({ id: 3, text: 'ccc' })
    });
  }
  return (
    <div className="card"  >
      { list.map( item => <div key={ item.id }>{ item.text }</div>)}
      <button onClick={ () => handleClick() }>add</button>
    </div>
  );
}
export default App;
```

### 9.6 惰性初始化值

​	初始化状态使用函数返回值作为初始化状态数据时，函数会被多次执行。解决这个问题需要使用闭包函数的方式初始化状态，使用 useState 函数方式，可以缓存函数状态。如下所示：

```tsx
import { useState, ReactNode, useEffect } from "react";
const computed = (n: number): number => {
  console.log( n, 'init' ); // 在每次状态更新时，函数均执行
  return n + 1+ 2
}
function App(): ReactNode {
  const [ count, setCount ] = useState(computed(0));
  // 采用如下，使用 useState 函数方式，可以缓存函数状态。
  // const [ count, setCount ] = useState( () => computed(0) );
  const handleClick = () => {
    setCount( count + 1 )
  }
  return (
    <div className="card"  >
      count, { count }
      <div onClick={ () => handleClick() }><button>add</button></div>
    </div>
  );
}
export default App;
```

### 9.7 同级组件通信

​	采用状态提升，将子组件的数据状态提升到父组件中，通过父组件将数据状态同步到子组件，做到改变任意子组件。

```tsx
import { useState, ReactNode, useEffect } from "react";
const Button = ({ count, handleClick }: { count: number, handleClick: () => void }) => {
  return <button onClick={ handleClick }>点击 { count }</button>
}
function App(): ReactNode {
  const [ count, setCount ] = useState(0);
  const handleClick = () => {
    setCount( count + 1 )
  }
  return (
    <div className="card"  >
      count, { count }
      <div >
        <Button count={ count } handleClick={ handleClick }></Button>
        <Button count={ count } handleClick={ handleClick }></Button>
      </div>
    </div>
  );
}
export default App;
```

### 9.8 状态重置

- 当组件被销毁时，所对应的状态也被重置，即状态也会被销毁。
- 当组件位置没有发生改变时，状态是会被保留的。组件结构相同，或者同一个组件具有相同的 key，状态会被保留。如果结构体不一样，或者 key 值不一样则会重置数据状态。

```tsx
import { useState, ReactNode, useEffect } from "react";
const Counter = () => {
  const [ count, setCount ] = useState( 0 );
  return <button onClick={ () => setCount( count + 1 ) }>count,{ count }</button>
}
function App(): ReactNode {
  const [ show, toggle] = useState( true );
  return (
    <div className="card"  >
     <button onClick={ () => toggle( !show )}>显隐</button><br/>
     {
       show ? <Counter key={'k1'}></Counter> : <Counter key={'k2'}></Counter>
     }
    </div>
  );
}
export default App;
```

### 9.9 计算属性

​	可以直接通过状态值，对其他的依赖数据的处理，类似 vue 中 computed 计算属性。如下所示：

```tsx
import { useState, ReactNode, useEffect } from "react";
function App(): ReactNode {
  const [ count, setCount] = useState( 0 );
  const doubleCount = count * 2; // 类似 vue 中 computed 计算属性
  return (
     <button onClick={ () => setCount( count + 1 )}>{ count }, { doubleCount }</button>
  )
}
export default App;
```

## 10. 受控组件

​	受控组件，通过 props 控制的组件，即为受控组件，表单控件是典型的受控组件。

```tsx
import { useState, ReactNode, useEffect, ChangeEvent } from "react";
function App(): ReactNode {
  const [ value, setValue ] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
    setValue( e.target.value );
  }
  return<input type="text" value={ value } onChange={ handleChange }/>
}
export default App;
```

## 11. hooks 进阶

### 11.1 useRef 

​	useRef 的功能： 第一，保存变量。第二，通过 ref 属性绑定 dom 。用 ref 引用一个值做记忆功能，ref 定义的变量类似于在 constructor 函数中定义的变量。可以通过 react 中的钩子函数 `useRef` 存储数据状态，使用 useRef 定义的数据不会导致视图的更新和函数的再次 render。仅用于变量的存储，并记录上一次的值，也就是不会受到函数组件 render 的影响，类似于函数组件外部定义的全局变量，需要通过 current 获取变量值。

```tsx
// class 组件
class UseRef extends react.Component{
  constructor(){
    this.vars = 'lantian'
  } 
}
// 函数组件
const UseRef = () => {
  const num = useRef(0);
  console.log( num.current );
  return <></>
}
```

​	**应用场景一：**变量存储。

只要触发 render 函数定义在函数组件的数据都会被重置，因此需要使用 useState 或 useRef 钩子记录数据状态，不会在 render 之后数据被重置。

```tsx
import { useRef, useState } from "react";
export const UseRef = () => {
  const [ count, setCount ] = useState(0);
  const timer = useRef<OrNull<number>>(null);
  const handleClick = () => {
    setCount( count + 1 );
    window.clearInterval( timer.current || 0 );
    timer.current = window.setInterval( () => {
      console.log( '我被调用了' );
    }, 1000 );
  }
  return (
      <button onClick={handleClick}>useRef, { count }</button>
  );
}
```

​	**应用场景二：**DOM 存储， 通过 ref 属性存储 dom 节点。

```tsx
import { useRef, useState } from "react";
export const UseRef = () => {
  const [ count, setCount ] = useState(0);
  const btnRef = useRef<OrNull<HTMLButtonElement>>( null );
  const handleClick = () => {
    setCount( count + 1 );
    btnRef!.current!.style.background = 'red';
  };
  return (
    <button onClick={ handleClick } ref={ btnRef }>useRef, { count }</button>
  );
}
```

​	**应用场景三：** dom 的列表引用存储， 通过 `ref={(ref)=>getRefs( ref )}`。

```tsx
import { useRef, useState } from "react";
export const UseRef = () => {
  const refs = useRef<Array<OrNull<HTMLDivElement>>>([]);
  const [ list, setList ] = useState([
    { id: 1, text: '111' },
    { id: 2, text: '222' },
    { id: 3, text: '333' },
  ]);
  const handleClick = () => {
    console.log( refs, 'refs' );
  };
  const getRefs = ( ref: OrNull<HTMLDivElement> ) => refs.current?.push( ref );
  return (
    <>
      {
        list.map( (item, index) => <div key={ item.id } ref={ (ref) => getRefs( ref ) }>{ item.text }</div>)
      }
    </>
  );
};
```

​	当组件添加 ref 属性的时候，需要 forwardRef 进行转发，forwardRef 让组件通过 ref 像父组件公开。父组件通过 ref 获取子组件的 ref 需要将子组件通过forwardRef 包裹。如下所示：

```tsx
import { useRef, useState, ReactNode, forwardRef } from "react";
const MyInput = forwardRef<HTMLInputElement>((props, ref) => {
  return <input ref={ ref }></input>
})
export const UseRef = () => {
  const ref = useRef( null );
  const handleClick = () => {
    console.log( ref ); // 获取子组件 ref
  }
  return (
    <>
      <MyInput ref={ ref }></MyInput>
      <button onClick={ handleClick }>button</button>
    </>
  );
}
```

### 11.2 useImperativeHandle 

​	`useImperativeHandle` 钩子函数用来暴漏指定的属性和方法，用于控制组件内部的方法类似 vue3.0 中的 `expose` 钩子函数，可以避免过多的暴露组件的 api，使用时避免 ref 的滥用。

```tsx
import { useRef, useState, ReactNode, forwardRef, useImperativeHandle } from "react";
const MyInput = forwardRef((props, ref) => {
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
  const ref = useRef<OrNull<HTMLElement>>( null );
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
```

### 11.3 useEffect

- **纯函数：**只负责自己的任务，有稳定的输入和输出，只要输入一定输出就确定，一一对应。它不会更改在函数调用前就已存在的对象或变量。

- **副作用：**函数在执行过程中对外部造成的影响称之为副作用，但有时候需要初始化处理副作用，那么就需要 useEffect 钩子。

```tsx
import { useRef, useEffect } from "react";
export const UseEffect = () => {
  const inputRef = useRef<OrNull<HTMLInputElement>>( null );
  useEffect( () => {
    inputRef.current!.focus()
  }, [])
  return <input type="text" ref={ inputRef } />
};
```

​	**分开处理：**多次调用 useEffect 即可。组件挂载或者更新会触发所有的 useEffect 钩子函数，如果不希望 render 后触发，可以指定第二个参数，决定回调函数的依赖状态项，如果依赖的状态发生了变化则触发钩子的回调函数，否则不触发。初始化时多个 useEffect 回调函数均触发，主要用于性能优化，组合了组件挂载和更新之后的操作。如下所示：

```tsx
export const UseEffect = () => {
  const [ count, setCount ] = useState(0);
  const [ msg, setMsg ] = useState( 'hi' );
  const handleClick = () => {
    setCount( count + 1)
  }
  useEffect( () => {
    console.log( count );
  })
  useEffect( () => {
    console.log( msg ); // 依赖项没有 msg, lint 会警告
  },[]);
  return <button onClick={ handleClick }>click me!</button>
}
```

​	**尽量将函数定义在 useEffect 回调函数：**这里的函数是指依赖数据状态的函数，如果定义在函数组件中，会在每次 render 的时候从新创建新的函数，耗费性能。可以是用 useCallback 解决这个问题，在每次 render 的时候函数不会重新创建，依然是原始函数。

```tsx
export const UseEffect = () => {
  const [ count, setCount ] = useState(0);
  const handleClick = () => {
    setCount( count + 1)
  }
  useEffect( () => {
    const foo = () => {
      console.log( count );
    }
    foo()
  }, [ count ]);
  return <button onClick={ handleClick }>click me!</button>
}
```

​	**useEffect 清理：** 清理的逻辑如下所示：

- 将组件挂载到页面时，将运行 setup 代码。
- 重新渲染 依赖项 变更的组件后
  - 首先，使用旧的 props 和 state 运行 cleanup 代码。
  - 然后，使用新的 props 和 state 运行 setup 代码。
- 当组件从页面卸载后，cleanup 代码 将运行最后一次。

```tsx
export const UseEffect = () => {
  const [ count, setCount ] = useState( 0 );
  const handleClick = () => {
    setCount( count + 1)
  }
  useEffect( () => {
    console.log( 'setup:', count );
    return () => {
      console.log( 'cleanup:', count );
    }
  }, [ count ]);
  return <button onClick={ handleClick }>关闭聊天室,{count}</button>
};
```

​	避免 useEffect 的依赖项是定义在函数组件中的引用类型数据，因为每次 render 后都会创建一个新的应用数据类型，这样不管引用类型的数据的值是否发生都会触发 useEffect 的回调函数。

### 11.4 useEffectEvent

​	当 useEffect 存在多个数据依赖项，会在状态依赖项中相互影响，如何精准的控制某一状态的改变才能触发回调函数，要么将相互影响的状态分开处理，要么通过 `react@18.2.x` 版本中的实验的钩子函数 `useEffectEvent` ，使用 [`useEffectEvent`](https://react.docschina.org/reference/react/experimental_useEffectEvent) 这个特殊的 Hook 从 Effect 中提取非响应式逻辑，[useEffect](https://react.docschina.org/reference/react/experimental_useEffectEvent) 。

​	**安装：**

```bash
npm i -S react@experimental react-dom@experimental
```

​	**问题描述：** 在改变某一状态不希望触发另一状态的业务逻辑，如下所示，当 theme 状态改变，依赖 title 的业务逻辑代码也会从新执行，显然不符合逻辑，也造成了额外的开销，影响性能。

```tsx
const Chat = ({ title, theme }: { title: string, theme: string }) => {
  useEffect( () => {
    console.log( '进入', title );
    console.log( 'theme', theme );
    return () => {
      console.log( 'cleanup: ', title, theme );
    }
  }, [ title, theme ]);
  return <div> hello, chat</div>
}

export const UseEffect = () => {
  const [ show, setShow ] = useState( true );
  const [ isDark, setDark ] = useState( false );
  const [ title, setTitle ] = useState( '情感聊天室' );
  const handleClick = () => setShow( !show );
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => setTitle( e.target.value );
  // 主体发生变化，useEffect 也会触发聊天室逻辑，显然不符合预期。
  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => setDark( e.target.checked );
  return (
    <>
     <button onClick={ handleClick }>关闭聊天室</button>
     <select name="select" onChange={ handleChange } value={ title }>
       <option value="情感聊天室">情感聊天室</option>
       <option value="体育聊天室">体育聊天室</option>
     </select>
     <input type="checkbox" checked={ isDark } onChange={ handleCheckChange }/>黑暗主题
     { show && <Chat title={ title } theme={ isDark ? 'dark' : 'light' }></Chat> } 
    </>
  )
}
```

​	**状态依赖要精准：**解决上面的多状态时，通过使用多个 `useEffect` ，按逻辑分开处理。这样可以避免不同的状态逻辑相互干扰，造成性能损耗和逻辑混乱。如下所示：

```tsx
const Chat = ({ title, theme }: { title: string, theme: string }) => {
  useEffect( () => {
    console.log( '进入', title );
    console.log( 'theme', theme );
    return () => {
      console.log( 'cleanup: ', title, theme );
    }
  }, [ title ]);
  useEffect( () => {
    console.log( 111 );
  }, [ theme ])
  return <div> hello, chat</div>
}
```

​	**useEffectEvent**：使用 [`useEffectEvent`](https://react.docschina.org/reference/react/experimental_useEffectEvent) 这个特殊的 Hook 从 useEffect 中提取非响应式逻辑。如下所示，使用 `useEffectEvent` 定义了函数 themeEffectEvent，是 theme 状态变为非响应式。

```tsx
const Chat = ({ title, theme }: { title: string, theme: string }) => {
  const themeEffectEvent = useEffectEvent(() => {
    console.log( '主体', theme );
  });
  useEffect( () => {
    themeEffectEvent(); // 执行 useEffectEvent 钩子函数，这样改变 theme 的状态就不在影响其他依赖的数据状态了
    console.log( '进入', title );
    return () => {
      console.log( 'cleanup: ', title );
    }
  }, [ title ]);
  return <div> hellochat</div>
}
```

### 11.5 useLayoutEffect

​	`useLayoutEffect` 是 [`useEffect`](https://react.docschina.org/reference/react/useEffect) 的一个版本，在浏览器重新绘制屏幕之前触发，在 useEffect 之前触发，钩子函数的回调都可以拿到 dom 元素。用于解决 useEffect 回调中处理页面逻辑闪屏问题。在用户没有注意到第一个额外渲染的情况下再次重新渲染。换句话说，`useLayoutEffect` 阻塞了浏览器的绘制。

### 11.6 useInsertionEffect 

​	`useInsertionEffect` 是为 CSS-in-JS 库的作者特意打造的。除非你正在使用 CSS-in-JS 库并且需要注入样式，否则你应该使用 [`useEffect`](https://react.docschina.org/reference/react/useEffect) 或者 [`useLayoutEffect`](https://react.docschina.org/reference/react/useLayoutEffect)。`useInsertionEffect` 可以在布局副作用触发之前将元素插入到 DOM 中，此钩子如法获取原生 dom。

```tsx
export const UseInsertionEffect = () => {
  const ref = useRef( null );
  useInsertionEffect( () => {
    // 无法获取 dom
    console.log( 'useInsertionEffect:', ref );
  })
  return (
    <div ref={ ref }></div> 
  )
}
```

### 11.7 useReducer

​	使用 reducer 统一处理业务逻辑，使业务与视图分离，以便后期维护。如下所示：

```tsx
import { useRef, ChangeEvent, useReducer } from "react";
type Item = {
  id: number;
  title: string;
}
type State = {
  list: Item[];
  title: string;
}
const listenReducer = ( state: State , action: Action ): State  => {
  const { type, payload } = action;
  switch( type ){
    case 'add': return {
      ...state,
      title: '',
      list: [ ...state.list, { id: Date.now(), title: payload.title }]
    }
    case 'remove': return {
      title: '',
      list: state.list.filter( item => item.id != payload.id )
    }
    case 'input': return {
      ...state,
      title: payload.title,
    }
    default: return state;
  }
}
export const UseReducer = () => {
  const inputRef = useRef<OrNull<HTMLInputElement>>( null );
  const [{ title, list }, listDispatch ] = useReducer(listenReducer, {
    title: '', 
    list: [{
      id: 1, title: 'aaa'
    }]
  });
  const add = () => listDispatch({ 
    type: 'add', 
    payload: { title } 
  });
  const remove = (id: Item['id']) => listDispatch({ 
    type: 'remove', 
    payload: { id }
  });
  const eidt = (id: Item['id']) => {
    const item = list.find( item => item.id == id );
    if( item ){
      inputRef.current?.focus();
    }else {
      throw Error( 'paramer is wrong' );
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    listDispatch({
      type: 'input',
      payload: {
        title: e.target.value
      }
    })
  }
  return (
    <>
      <input type="text" 
          onChange={ (e) => handleChange(e) } 
          value={ title } 
          ref={ inputRef }/>
      <button onClick={ add }>add</button>
      <ul>
        {
          list.map( item => {
            return <li key={ item.id }>
              { item.title } 
              <button onClick={ () => eidt( item.id ) }>编辑</button>
              <button onClick={ () => remove( item.id ) }>删除</button>
            </li>
          })
        }
      </ul>
    </>
  )
}
```

​	为了提高性能可以使用 use-immer 库，优化每次 render 变量重新创建的性能。因为每次 render 函数组件内部的方法也会被重新创建，建议使用 useCallback 对组件内部的函数进行优化。

### 11.8 createContext/useContext

​	是一种跨组件通信的方式，在组件外部定义 context 上下文通过 `createContext` 创建 context 上下文。通过作用域内置组件 `Context.Provider` 挂载数据，在子组件中通过 `useContext` 获取 context 上下文数据，实现组件之间的通信。

```tsx
import { useRef, ChangeEvent, useReducer, createContext, useContext } from "react";
const Context = createContext<OrNull<number>>(null);
const Title = () => {
  const value = useContext( Context );
  return (
    <div>
      hello, Title, { value }
    </div>
  )
}
const Head = () => {
  const value = useContext( Context );
  return (
    <div>
      hello Head, { value }
      <Title></Title>
    </div>
  ) 
}
export const UseContext = () => {
  return (
    <>
    <Context.Provider value={123}>
      <div> hello App</div>
      <Head></Head>
    </Context.Provider>
    </>
  )
}

```

### 11.9 reducer & context

​	在 react 中也可以不使用 redux 来控制跨组件状态管理，通过 reducer 和 context 两个钩子函数，实现 redux 的能力。

使用 createContext 创建上下文，通过上下文组件 `createContext .Provider` 作为通信的根组件，将状态数据 state 和 useReducer 中 dipatch 方法通过上下文组件属性 value 挂载到根组件，在子组件中通过 useContext 钩子函数使用上下文，即可获取上下文数据以及 `dispatch` 方法。如下所示：

**创建上下文：** 为了方便上下文文件中包含了模块的部分数据类型，以及上下文 context 初始化数据。

```ts
// ./Context.ts
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
```

**定义context作用域：** 通过 `Context.Provider` 组件将子组件包裹，并将数据和方法通过属性 value 挂载到  `Context.Provider` 上。

```tsx
// ./index.tsx
import { useReducer } from 'react';
import { ListContent } from "./ListContent";
import { ListHead } from "./ListHead";
import { Context, initState, type Item, type State } from './Context';
const reducer = ( state: State, action: Action ): State  => {
  const { type, payload } = action;
  switch( type ){
    case 'add': return {
      ...state,
      title: '',
      list: [ ...state.list, { id: Date.now(), title: payload.title }]
    }
    case 'remove': return {
      title: '',
      list: state.list.filter( item => item.id != payload.id )
    }
    case 'input': return {
      ...state,
      title: payload.title,
    }
    default: return state;
  }
}
export const ContextReducer = () => {
  const [ state, dispatch ] = useReducer( reducer, initState );
  return (
    <Context.Provider value={{ state, dispatch }}>
      <ListHead></ListHead>
      <ListContent></ListContent>
    </Context.Provider>
  );
}
```

**使用作用域状态和方法**：在子组件中通过 useContext 钩子函数获取作用状态和方法。

```tsx
// ./ListHead/index.tsx
import { useRef, useContext, type ChangeEvent } from 'react';
import { Context } from '../Context';
export const ListHead = () => {
  const inputRef = useRef<OrNull<HTMLInputElement>>( null );
  const { state: { title='' }, dispatch=()=>{} } = useContext( Context );
  const add = () => dispatch({ 
    type: 'add', 
    payload: { title } 
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'input',
      payload: {
        title: e.target.value
      }
    })
  }
  return (
    <>
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        value={title}
        ref={inputRef}
      />
      <button onClick={add}>add</button>
    </>
  )
}
```

```tsx
// ./ListContent/index.tsx
import { useContext } from "react";
import { Context, type Item } from "../Context";
export const ListContent = () => {
  const { state: { list=[] }, dispatch=()=>{} } = useContext( Context );
  const remove = (id: Item['id']) => dispatch({
    type: 'remove', 
    payload: { id }
  });
  const eidt = (id: Item['id']) => {
    const item = list.find( item => item.id == id );
  }
  return (
    <ul>
      {
        list.map( item => {
          return <li key={ item.id }>
            { item.title } 
            <button onClick={ () => eidt( item.id ) }>编辑</button>
            <button onClick={ () => remove( item.id ) }>删除</button>
          </li>
        })
      }
    </ul>
  )
}
```

### 11.10 memo

​	`memo` 允许你的组件在 props 没有改变的情况下跳过重新渲染。

- [当 props 没有改变时跳过重新渲染](https://react.docschina.org/reference/react/memo#skipping-re-rendering-when-props-are-unchanged)
- [使用 state 更新记忆化（memoized）组件](https://react.docschina.org/reference/react/memo#updating-a-memoized-component-using-state)
- [使用 context 更新记忆化（memoized）组件](https://react.docschina.org/reference/react/memo#updating-a-memoized-component-using-a-context)
- [最小化 props 的变化](https://react.docschina.org/reference/react/memo#minimizing-props-changes)
- [指定自定义比较函数](https://react.docschina.org/reference/react/memo#specifying-a-custom-comparison-function)

​	当未使用 memo 时，每次 render 子组件都会被执行，无论是否有状态。在使用 `memo` 之后，只要状态 props 不发生变化，子组件不会执行。不用过多的使用 memo，出现性能问题再着手考虑和使用 `memo` 优化渲染，比较适合无状态组件。如下所示：

```tsx
import { useState, memo } from "react";
const Head = memo(() => {
  return (
    <div>
    I am head，{ Math.random() }
  </div>
  ) 
})
export const UseMemo = () => {
  const [ count, setCount ] = useState( 0 );
  const handleClick = () => {
    setCount( count + 1 );
  }
  return (
    <>
      hello count, { count }
      <button onClick={ handleClick }>add</button>
      <Head></Head>
    </>
  );
}
```

### 11.11 useMemo

​	`useMemo` 是一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果，缓存的是状态而 `useCallback` 缓存的是状态函数，一个缓存的是状态结果，一个缓存的是状态函数 。

- [跳过代价昂贵的重新计算](https://react.docschina.org/reference/react/useMemo#skipping-expensive-recalculations)
- [跳过组件的重新渲染](https://react.docschina.org/reference/react/useMemo#skipping-re-rendering-of-components)
- [记忆另一个 Hook 的依赖](https://react.docschina.org/reference/react/useMemo#memoizing-a-dependency-of-another-hook)
- [记忆一个函数](https://react.docschina.org/reference/react/useMemo#memoizing-a-function) 

​	任意状态发生了改变，Head 组件都会触发 render，这是由于 react 底层采用的是 `Object.is` 的方式做数据比对的，引用类型每次 render 都会被重新创建，因此每次比对的结果都不相等，都会触发新的 render，与 `useCallback` 不同的是，`useCallback` 缓存的是状态函数。如下所示：

```tsx
import { useState, memo } from "react";
const Head = memo(({ list }: { list: string[]}) => {
  return <div> I am head，{ Math.random() } </div>
}
export const UseMemo = () => {
  const [ count, setCount ] = useState( 0 );
  const [ msg, setMsg ] = useState( 'hello react' );
  const list = [ msg.toLowerCase(), msg.toUpperCase() ];
  const handleClick = () => {
    setCount( count + 1 );
  }
  return (
    <>
      hello count, { count }
      <button onClick={ handleClick }>add</button>
      <Head list={ list }></Head>
    </>
  );
}
```

​	为了解决这个问题，react 提供的钩子 `useMemo` 函数。如下所示：

```tsx
import { useState, memo, useMemo } from "react";
const Head = memo(({ list }: { list: string[]}) => {
  return <div> I am head，{ Math.random() } </div>
})
export const UseMemo = () => {
  const [ count, setCount ] = useState( 0 );
  const [ msg, setMsg ] = useState( 'hello react' );
  // 使用 useMemo 定义数据
  const list = useMemo( () => [ msg.toLowerCase(), msg.toUpperCase() ], [ msg ]);
  const handleClick = () => {
    setCount( count + 1 );
  }
  return (
    <>
      hello count, { count }
      <button onClick={ handleClick }>add</button>
      <Head list={ list }></Head>
    </>
  )
}
```

### 11.12 useCallback

​	`useCallback` 是一个允许你在多次渲染中缓存函数的 React Hook。由于状态发生改变就会触发 render，函数组件中的变量和方法都会被重新创建，影响性能。`useCallback` 就是为了解决函数重复被创建的问题，缓存的是函数而 `useMemo` 缓存的是计算状态。

```tsx
import { useState, memo, useMemo, useCallback } from "react";
const Head = memo(({ fn }: { fn: VoidFunction }) => {
  return <div> I am head，{ Math.random() } </div>
})
export const UseCallback = () => {
  const [ count, setCount ] = useState( 0 );
  const handleClick = () => {
    setCount( count + 1 );
  }
  const fn = useCallback(() => {
    console.log( 1 );
  }, [])
  return (
    <>
      hello count, { count }
      <button onClick={ handleClick }>add</button>
      <Head fn={ fn }></Head>
    </>
  );
}
```

​	`useCallback` 是 `useMemo` 的一个特例的简写形式。使用 `useMemo` 是也可以实现缓存函数的功能，只要在回调函数中返回状态改成函数即可，如下所示：

```tsx
import { useState, memo, useMemo, useCallback } from "react";
const Head = memo(({ fn }: { fn: VoidFunction }) => <div> I am head，{ Math.random() } </div> )
export const UseCallback = () => {
  const [ count, setCount ] = useState( 0 );
  const handleClick = () => {
    setCount( count + 1 );
  }
  const fn = useCallback(() => {
    console.log( 1 );
  }, [])
  /*
  	const fn = useMemo( () => () => {
     	console.log( msg );
  	}, [])
  */
  return (
    <>
      hello count, { count }
      <button onClick={ handleClick }>add</button>
      <Head fn={ fn }></Head>
    </>
  );
}
```

### 11.13 startTransition

​	`startTransition` 可以让你在不阻塞 UI 的情况下更新 state。如下例子，在输入时动态标记输入的内容对应字符为红色的列表，由于列表数据较多，在输入的时候会出现明显的卡顿，为了更好的体验，将耗时的渲染放入 startTransition 函数中，让其不对其他渲染阻塞。

```tsx
import { useState, startTransition, type ChangeEvent,type ReactNode } from "react";
const List = ({ query }: { query: string }) => {
  const word = 'hello word';
  let items: ReactNode[] = []
  if( query!=='' && word.includes( query ) ){
    const [a,b] = word.split( query );
    items = Array.from({ length: 10000 }, (item,i)=><li key={i}>{a}<span style={{color:'red'}}>{query}</span>{ b}</li> )
  }else {
    items = Array.from({ length: 10000 }, ( item, i ) => <li key={i}>{word}</li> )
  }
  return <>
    <ul>{ items }</ul>
  </>
}
export const UseTransition = () => {
  const [ search, setSearch ] = useState( '' );
  const [ query, setQuery ] = useState<string>( '');
  const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
    setSearch( e.target.value );
    startTransition( () => {
      setQuery( e.target.value );
    })
  }
  return (
    <>
      <input type="text" value={ search } onChange={ handleChange }/>
      <List query={ query }></List>
    </>
  );
}
```

### 11.14 useTransition

​	`useTransition` 是一个帮助你在不阻塞 UI 的情况下更新状态的 React Hook。是 `startTransition` 方法的钩子版本，使用方法基本一致。useTransition 钩子函数提供了等待状态，用于 loading 效果。

```tsx
export const UseTransition = () => {
  const [ search, setSearch ] = useState( '' );
  const [ query, setQuery ] = useState<string>( '');
  const [ isPending, startTransition ] = useTransition(); // 使用钩子
  const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
    setSearch( e.target.value );
    startTransition( () => {
      setQuery( e.target.value );
    })
  }
  return (
    <>
      <input type="text" value={ search } onChange={ handleChange }/>
      { isPending ? <div>loading</div> : <List query={ query }></List> }
    </>
  )
}
```

### 11.15 useDeferedValue

​	`useDeferedValue` 是一个 React Hook，可以让你延迟更新 UI 的某些部分。useDeferedValue(value)，value 参数是延时执行的组件的依赖状态。

```tsx
import { useState, memo, useMemo, useDeferredValue, useTransition, Suspense, type ChangeEvent, type ReactNode } from "react";
const List = ({ query }: { query: string }) => {
  const word = 'hello word';
  let items: ReactNode[] = []
  if( query!=='' && word.includes( query ) ){
    const [a,b] = word.split(query);
    items = Array.from({length:10000},(item,i) =><li key={i}>{a}<span style={{color:'red'}}>{query}</span>{b}</li>)
  }else {
    items = Array.from({ length: 10000 }, ( item, i ) => <li key={i}>{word}</li> )
  }
  return <>
    <ul>{ items }</ul>
  </>
}
export const UseDeferredValue = () => {
  const [ search, setSearch ] = useState( '' );
  const query = useDeferredValue( search );
  const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
    setSearch( e.target.value );
  }
  return (
    <>
      <input type="text" value={ search } onChange={ handleChange }/>
      <List query={ query }></List>
    </>
  )
}
```

### 11.16 useId

​	`useId` 是一个 React Hook，可以生成传递给无障碍属性的唯一 ID。

```tsx
import { useId } from "react";
const Password = () => {
  const password = useId();
  return <>
    <label>密码：<input type="password" aria-describedby={ password } />
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
}
```

​	另外，可以通过 `ReactDOM.createRoot` 方法配置 useId 的前缀。格式：“:react-r1: ” [参考链接](https://react.docschina.org/reference/react-dom/client/createRoot)。

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
ReactDOM.createRoot(
  document.getElementById('root')!, 
  { 
    identifierPrefix: 'react-'
  }
).render(
  <App />
);
```

### 11.17 useDebugValue & useSyncExternalStore

- [useDebugValue](https://react.docschina.org/reference/react/useDebugValue) 
- [useSyncExternalStore](https://react.docschina.org/reference/react/useSyncExternalStore)

## 12. react 组件的封装

```bash
npm i -S antd # @5.13.x
npm i -S @ant-design/icons # @5.2.6
```

[antd官网](https://ant-design.antgroup.com/components/overview-cn?from=msidevs.net)

## 13. 自定义 hook

​	自定义实现获取鼠标移动坐标。如下所示：

```jsx
import { useEffect, useState } from "react"
export const useMouse = () => {
  const [ state, setSate ] = useState({
    pageX: 0,
    pageY: 0
  });
  useEffect( () => {
    const move = (e: MouseEvent) => {
      setSate({
        pageX: e.pageX,
        pageY: e.pageY
      })
    }
    document.addEventListener( 'mousemove', move, false );
    return () => document.removeEventListener( 'mousemove', move );
  }, []);
  return state;
}
```

​	在组件中使用自定义 hook，与其他内置钩子一样，可以直接使用，自定义钩子也就是通过 react 内置的钩子函数对一些特定功能的逻辑函数式封装，也及时带有 react 钩子的函数式编程。

```tsx
import { useMouse } from "@/hooks"
export const UseMouse = () => {
  const { pageX, pageY } = useMouse();
  return <>
    <div>pageX: { pageX }px </div>
    <div>pageY: { pageY }px </div>
  </>
}
```

## 14. 第三方 hook

​	第三方 hook 有：`ahook`、`react-use` 等。ahook 是一套高质量可靠的 react Hooks 库，在当前 React 项目研发过程中，一套好用的 React hooks 库是必不可少的。

```bash
npm i -S ahooks
```

### 14.1 useRequest

​	默认立即执行，并返回结果，useRequest 仅是对异步请求结果的封装处理，异步请求依然需要使用 axios 等库。如果手动执行，需要配置可选参数 `{manual:true}`

 [ahooks](https://ahooks.gitee.io/zh-CN/hooks/use-request/index) 

## 15. react 高级功能

### 15.1 flushSync

​	`flushSync` 让你强制 react 同步刷新提供的回调中的任何更新，这确保了 DOM 立即更新，通过强制更新DOM, 可以同步获取到状态更新后的 DOM 渲染值， 类似 vue 中的 nextTick 钩子函数。如下所示：

```tsx
import { useRef, useState } from "react"
import { flushSync } from 'react-dom'
export const FlushSync = () => {
  const [ count, setCount ] = useState(0)
  const ref = useRef<OrNull<HTMLDivElement>>(null);
  const handleClick = () => {
    flushSync( () => {
      setCount( count + 1 );
    })
    console.log( ref.current?.innerHTML );
  }
  return (
    <div>
      <button onClick={ handleClick }>click me!</button>
      <div ref={ ref }>count, { count }</div>
    </div>
  )
}
```

​	多个 useState 执行会同时更新渲染，并且仅 render 一次。如下所示：

```tsx
import { useRef, useState } from "react"
import { flushSync } from 'react-dom'
export const FlushSync = () => {
  const [ count, setCount ] = useState(0)
  const [ count2, setCount2 ] = useState(0)
  const ref = useRef<OrNull<HTMLDivElement>>(null);
  const handleClick = () => {
    setCount( count + 1 )
  	setCount2( count2 + 1)
  }
  return (
    <div>
      <button onClick={ handleClick }>click me!</button>
      <div ref={ ref }>count, { count }，{ count2 }</div>
    </div>
  )
}
```

 	使用 `flushSync` 阻止 useState 状态批处理功能，状态每次变更都会触发 render 执行。不影响其他未使用 `flushSync` 状态变更批处理，即其他未使用 flushSync 同步状态的，依然批量更新状态，不触发多次 render。 如下所示，`setCount2`，`setCount3` 状态批处理。

```tsx
import { useRef, useState } from "react"
import { flushSync } from 'react-dom'
export const FlushSync = () => {
  console.log(1);
  const [ count, setCount ] = useState(0)
  const [ count2, setCount2 ] = useState(0)
  const [ count3, setCount3 ] = useState(0)
  const ref = useRef<OrNull<HTMLDivElement>>(null);
  const handleClick = () => {
    flushSync( () => {
      setCount( count + 1 );
    })
    setCount2( count2 + 1 );
    setCount3( count3 + 1 );
    console.log( ref.current?.innerHTML );
  }
  return (
    <div>
      <button onClick={ handleClick }>click me!</button>
      <div ref={ ref }>count, { count }, { count2 }, { count3 }</div>
    </div>
  )
}
```

### 15.2 error boundary

​	默认情况下，如果您的应用程序在渲染错误时抛出错误，React 将从屏幕上移除 UI。为了防止这种情况，您可以将 UI 的一部分包装到错误边界中。错误边界是一种特殊的组件，可以让您显示一些后背的 UI 而不是崩溃的部分，如错误信息等，采用第三方支持。[react-error-boundar](https://www.npmjs.com/package/react-error-boundary) 。

```bash
npm i -S react-error-boundary
```

​	自定义错误信息，并且不影响

```tsx
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
export const Head = () => {
  const [ count, setCount ] = useState( 0 );
  throw new Error( 'wrong!' )
  return <div> hello Head, { count }</div>
}
export const ReactErrorBoundary = () => {
  return (
    <ErrorBoundary fallback={ <div>render is wrong!</div> }>
      <Head></Head>
    </ErrorBoundary>
  );
}
```

### 15.3 lazy

​	`lazy` 能够让你在组件第一次被渲染之前延迟加载组件的代码。如下所示定义异步加载组件 Header，注意需要使用 default 导出，否则会报错，ts类型检查也会提示使用 default 导出组件。lazy 需要配合 `import('path')` 和 `Suspense` 组件

```tsx
// ./Header.tsx
console.log('I am Header component');
const Header = () => {
  return <div>hello header, test lazy</div>
}
export default Header;
```

​	使用 lazy 加载组件，需要配合 import 导入组件。另外需要配置内置的异步组件 Suspense 完成组件的异步加载， 否则会报错。

```tsx
import { lazy, useState, Suspense } from "react";
const Header = lazy( () => import( './Header.tsx' ) ); // 懒加载
export const Lazy = () => {
  const [ show, setShow ] = useState(false);
  const handleClick = () => {
    setShow( !show )
  }
  return <div>
    hello lazy,
    { show && <Suspense fallback={ <span>loading</span> } >
      <Header />
      </Suspense> 
    }
    <div>
      <button onClick={ handleClick }>显示/隐藏</button>
    </div>
  </div>
}
```

###  15.4 createPortal

​	`createPortal` 允许你将 JSX 作为 children 渲染至 DOM 的不同部分，将组件渲染到指定的 DOM 容器中。

```tsx
import { createPortal } from "react-dom"
export const CreatePortal = () => {
  return <>
    { createPortal(<p>我是 createPortal </p>, document.querySelector('#root')! ) }
  </>
}
```

### 15.5 Profiler

​	`<Profiler id='' onRender={}>` 允许你编程式测量 React 树的渲染性能。

```tsx
import { Profiler as ReactProfiler, useState } from 'react'
const Head = ({ count }: { count: number }) => {
  return <div>
    hello Head, { count }
  </div>
}
export const Profiler = () => {
  const [ count, setCount ] = useState( 0 );
  const handleClick = () => {
    setCount( count + 1 );
  }
  const onRender = (id: string, phase: string, actualDuration: number, baseDuration: number, startTime: number, commitTime: number) => {
    console.log({ 
      id, phase, actualDuration, 
      baseDuration, startTime, commitTime,
    });
  }
  return <div>
    hello Profiler, { count }
    <button onClick={ handleClick }>click me!</button>
    <ReactProfiler id="Profiler" onRender={ onRender }>
      <Head count={ count }></Head>
    </ReactProfiler>
  </div>
}
```

### 15.6 hyrateRoot

​	`hydrateRoot` 函数允许你在先前由 [`react-dom/server`](https://react.docschina.org/reference/react-dom/server) 生成的浏览器 HTML DOM 节点中展示 React 组件。

## 16. CSS-in-JS (styled-components)

​	CSS-in-JS 解决方案给我们提供了新的编写 CSS 的方式。这些方案使用以 Javascript 为基础的 API 来创建和编写样式。

​	优点：动态样式、元素作用域、自定义主题、支持 SSR、方便单元测试等。[styled-components](https://styled-components.com/docs/basics#installation)。

```bash
npm i -S styled-components
```

## 17. TailwindCSS

​	只书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站，Taiwind 框架利用 CSS 原子化思想实现的。

​	优点：统一的风格，构建体积很小，具备响应式的一切，组件驱动等。 [TailwindCSS](https://tailwindcss.com/docs/guides/vite#react)

```bash
npm install -D tailwindcss postcss autoprefixer
```

​	依赖安装完成后，执行如下命令，生成 `tailwind.config.js` 和 `postcss.config.js` 两个配置文件。

```bash
npx tailwindcss init -p
```

​	按照官方文档修改默认配置文件。

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // 在 tailwind.config.js 文件中添加所有模板文件的路径。
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

​	在 src 文件夹下创建 index.css 文件，并填写默认内容。vscode 默认不支持 css 文件中的 @ 语法，在 vscode 的 setting 配置文件中配置`"css.lint.unknownAtRules": "ignore"` 即可。

```css
/* ./index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

​	然后，将 index.css 在入口文件中引入。

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // 导入全局 CSS
ReactDOM.createRoot(document.getElementById('root')!, { 
  identifierPrefix: 'react-',
  onRecoverableError(...args){
    console.log( args )
  }
}).render( <App /> )
```

​	另外，在 vscode 安装插件 `Tailwind CSS IntelliSense` 在书写样式的时候可以提示。

## 18. react-spring 动画库

​	使用自然流畅的动画，将提升 UI 和交互，让应用栩栩如生，[react-spring](https://www.react-spring.dev/docs/getting-started)。安装如下：

```bash
npm i -S @react-spring/web
```

​	实现 fadeIn 淡入的动画效果，代码如下所示：

```tsx
import { ReactNode, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

export const Animate = ({ isVisible, children }: { isVisible: boolean, children?: ReactNode }) => {
  const styles = useSpring({
    opacity: isVisible ? 1 : 0,
    y: isVisible ? 0 : 24
  });
  return <animated.div style={ styles }> { children } </animated.div>
}

export const FadeIn = () => {
  const [ isVisible, setVisible ] = useState( true );
  return (
    <div>
      <button onClick={ () => setVisible( !isVisible ) }>显示/隐藏</button>
      <Animate isVisible={ isVisible }> hi, react-spring</Animate>
    </div>
  )
}
```

​	另外，可以通过钩子函数拿到动画变化的数据，如下所示：

```tsx
export const Animate = ({ isVisible, children }: { isVisible: boolean, children?: ReactNode }) => {
  const styles = useSpring({
    opacity: isVisible ? 1 : 0,
    y: isVisible ? 0 : 24
  });
  // 获取计算的 y 坐标值
  return (
	<animated.div style={ styles }> 
      { children }
      <animated.span>{ styles.y.to( val => val ) }</animated.span>
    </animated.div>
  ) 
}
```

## 19. antd Charts

​	图标库：[Ant Design Charts](https://ant-design-charts.antgroup.com/)/Recharts/echarts-for-react 按照文档配置即可。

## 20. react-BMapGL

 百度 react 版的api：[React-BMapGL](https://lbsyun.baidu.com/solutions/reactBmapDoc ) 
