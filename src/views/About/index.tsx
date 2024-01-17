import { RouteComponentProps, RouteChildrenProps, Route } from "react-router-dom";
const About = () => {
  return (
    <>
      <div>hello about!</div>
      <input type="text" />
      <Route exact path='/about/detail'>
        <Detail />
      </Route>
    </>
  )
}


const Detail = () => {
  console.log(1111111111);
  return <div> i am about detail, hello! </div>
}

export {
  About,
  Detail
}