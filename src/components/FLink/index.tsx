
import { Link } from "react-router-dom";
export const FLink = () => {
  return (
    <ul>
      <li><Link to='/'>home</Link></li>
      <li><Link to='/about'>about</Link></li>
    </ul>
  )
}