
declare interface VoidFunction {
  (...args?: unknown[]): void
}

declare interface Json extends object {
  [key: string]: unknown;
}

declare type OrNull<T> = T | null;

declare type OrUndef<T> = T | undefined;