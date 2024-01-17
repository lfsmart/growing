import { ReactNode } from "react";
import { RouteChildrenProps } from "react-router-dom";

export const Component = (props: RouteChildrenProps) => {
  console.log( props, 'Component' );
  return (
    <div>Children Component!</div>
  )
}