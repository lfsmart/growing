# 源码学习

​	使用的版本是 `react@18.2.x` 学习和调试 react 原理。使用了是完整的 react 库代码，然后通过 script 引入的方式测试调试代码的。

- [react@18.2.x](https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.development.js)
- [react-dom@18.2.x](https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js) 
- [react-router-dom@6.15.x](https://cdn.bootcdn.net/ajax/libs/react-router-dom/6.15.0/react-router-dom.development.js)
- [redux@4.x](https://cdn.bootcdn.net/ajax/libs/redux/4.2.1/redux.js)
- [react-redux@8.1.x](https://cdn.bootcdn.net/ajax/libs/react-redux/8.1.2/react-redux.js)
- [redux-thunk@2.4.x](https://cdn.bootcdn.net/ajax/libs/redux-thunk/2.4.2/redux-thunk.js) 
- [redux-promise-middleware@6.1.x](https://cdn.bootcdn.net/ajax/libs/redux-promise-middleware/6.1.3/redux-promise-middleware.js)

## 1. React.createElement

​	创建 react 组件或者称为虚拟 dom。React.createElement(elementName,attrs,...children);

```javascript
let handleClick = ()=>{};
// 创建 VDOM
const button = React.createElement( 
    'button', 
    {
      id: 'btn',
      type: 'button',
      className: 'button',
      onClick: () => handleClick()
 	}, 
    '我是 React 创建的 button',
); 
// 子节点，从第三个参数之后均被视为子节点
const div = React.createElement( 'div', {}, '我是 React 创建的 div ', button );

```

## 2. ReactDOM.createRoot

​	创建一个 React 根，用于挂载 React 组件。一旦创建了根，就可以通过根将 React 组件渲染到 DOM中。与以前版本的 `React.render()`方法不同，`ReactDOM.createRoot()`允许将 React 组件渲染到指定的 DOM 节点上，而不是默认的 document.body。`ReactDOM.createRoot`还支持并发模式，使得在服务器端渲染和流式渲染等场景下更加高效。

```javascript
const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render( div ); // 将 VDOM -> dom，并渲染到子页面
```

## 3. 组件更新

​	在 react 中组件一旦创建是无法修改的，只能使用新创建的组件进行替换。意味着只要想修改就需要执行 render 重新渲染等。如下想更换按钮名称改成 `“click me”` 我们需要如下操作。

```javascript
handleClick = () => {
	const button2 = React.createElement( 
		'button', 
         {
             id: 'btn',
             type: 'button',
             className: 'button',
             onClick: () => handleClick()
     	 }, 
        'click me' 
    );
    // 创建 VDOM
	const div = React.createElement( 'div', {}, '我是 React 创建的 div ', button2 ); 
	root.render( div );
 }
```

​	通过上面的实现，我们发现编程式实现逻辑存在大量冗余的代码且操作复杂，不易维护和书写。当然通过这种方式只是 react 创建虚拟 DOM 的过程，而非渲染真实 DOM，事实上渲染真实 DOM，react 是计算最小的成本替换真实的 dom。

## 4. 声明式

​	上面的方式被称为编程式，所谓编程式，是通过硬编码的方式实现虚拟 DOM 的创建和渲染等相关的逻辑，而声明式则是通过一种类似编写 html 的方式编写虚拟 DOM 实现组件的创建和渲染，当然需要借助于 babel 编译器，否则声明式的方式无法被正常的识别。

​	同样需要使用 [babel.js ](https://cdn.bootcdn.net/ajax/libs/babel-standalone/7.22.17/babel.js) 直接通过 script 的方式引入即可，如下所示就可以直接使用声明式方式书写 react 代码了。

```html
<script type="text/babel">
  const div = <div>
    我是一个
    <button onClick={ () => console.log( 'clicked' )}>我是按钮</button>
  </div>;
  const root = ReactDOM.createRoot( document.getElementById( 'root' ) ); 
  root.render( div );
</script>
```

​	JSX 语法就是 React.createElement() 的语法糖，JSX 在执行前会被 babel 转换为 js 代码，即 React.createElement 创建组件的方式。可以通过 babel 官网，查看转换后的结果 [babel 试一试 ](https://www.babeljs.cn/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=ATDGHsDsGcBdgCYEsBuwC8wA8AjArrLFAHyCIRoPRmgkMaB1KVgPT6EkBQIQA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=env%2Creact&prettier=false&targets=&version=7.23.7&externalPlugins=&assumptions=%7B%7D) 
