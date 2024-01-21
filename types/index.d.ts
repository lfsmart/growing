
declare interface Params {
  [key: string]: string | string[];
}

declare interface RouteProps {
  params: Params,
  searchParams: URLSearchParams
}


declare type OrNull<T> = T | null;
declare type StrOrNum = string | number;

