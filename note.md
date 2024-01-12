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

![image-20240104230808370](C:/Users/user/AppData/Roaming/Typora/typora-user-images/image-20240104230808370.png)

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
  const handleClick1 = () => {
      
  }
  const handleClick2 = () => {
      return (e:) => {
          
      }
  }
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
Parent.Com1 = () =>  <div>hello Com1</div>;

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

​	useRef 的功能： 第一，保存变量。第二，绑定 dom 通过 ref 属性。用 ref 引用一个值做记忆功能，ref 定义的变量类似于在 constructor 函数中定义的变量。可以通过 react 中的钩子函数 `useRef` 存储数据状态，使用 useRef 定义的数据不会导致视图的更新和函数的再次 render。仅用于变量的存储，并记录上一次的值，也就是不会受到函数组件 render 的影响，类似于函数组件外部定义的全局变量，需要通过 current 取到变量值。

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

