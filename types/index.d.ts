
declare interface Params {
  [key: string]: string | string[];
}

declare interface RouteProps {
  params: Params,
  searchParams: URLSearchParams
}
