import { Route, Link, NavLink, Switch } from "react-router-dom";
import { FNavLink, FLink, UseHistory, RouteOption } from '@/components'
import { Home } from "./views/Home";
import { About, Detail } from "./views/About";
import { Student } from "./views/Student";
import { MyForm } from "./views/MyForm";


function App() {
  return(
    <div className="app">
      {/* <FNavLink></FNavLink>
      <FLink></FLink>
      <UseHistory></UseHistory> */}
      <Switch>
        <Route exact path='/' component={ Home }></Route>
        
        <Route exact path='/ChildrenFn' children={ (props) => <RouteOption.ChildrenFn {...props} /> }></Route>
        <Route exact path='/ChildrenComponent' children={ <RouteOption.ChildrenComponent /> }></Route>
        <Route exact path='/Render' render={ ( props ) => <RouteOption.Render { ...props } /> }></Route>
        <Route exact path='/Component' component={ RouteOption.Component } ></Route>
        <Route exact path='/ChildrenReactNode'>
          { RouteOption.ChildrenJSX }
        </Route>
        <Route exact path='/ChildrenJSX'>
          <RouteOption.ChildrenJSX />
        </Route>
        <Route exact path='/ChildrenJSX'>
          { (props) => <RouteOption.ChildrenJSXFn { ...props } />}
        </Route>

        <Route path='/about'>
          <About />
        </Route>

        <Route path='/form'>
          <MyForm />
        </Route>
      </Switch>

    </div>
  ) 
}
export default App;
