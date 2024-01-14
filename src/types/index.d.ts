
declare interface VoidFunction {
  (...args?: unknown[]): void
}

declare interface Json extends object {
  [key: string]: unknown;
}

declare type OrNull<T> = T | null;

interface Action<T=any> {  
  type: string;
  payload: T;  
}



