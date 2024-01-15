import { ReactNode, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

export const Animate = ({ isVisible, children }: { isVisible: boolean, children?: ReactNode }) => {
  const styles = useSpring({
    opacity: isVisible ? 1 : 0,
    y: isVisible ? 0 : 24
  });
  return <animated.div style={ styles }> 
    { children } 
    <div>
      <animated.span>{ styles.y.to( val => val ) }</animated.span>
    </div> 
    </animated.div>
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