
import { NavLink } from "react-router-dom";
import styles from './index.module.css';
export const FNavLink = () => {
  return (
    <ul>
      <li><NavLink to='/' activeClassName={ styles.active } exact >home</NavLink></li>
      <li><NavLink to='/about' activeClassName={ styles.active }>about</NavLink></li>
    </ul>
  )
}