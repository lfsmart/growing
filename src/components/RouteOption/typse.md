```tsx
  // RouteProps 数据类型
  export interface RouteProps<
    Path extends string = string,
    Params extends { [K: string]: string | undefined } = ExtractRouteParams<Path, string>,
> {
    location?: H.Location | undefined;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | undefined;
    render?: ((props: RouteComponentProps<Params>) => React.ReactNode) | undefined;
    children?: ((props: RouteChildrenProps<Params>) => React.ReactNode) | React.ReactNode | undefined;
    path?: Path | readonly Path[] | undefined; // 路由路径
    exact?: boolean | undefined; // 是否为精确匹配
    sensitive?: boolean | undefined; // 大小写是否敏感
    strict?: boolean | undefined;
}
```