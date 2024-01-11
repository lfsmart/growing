
interface VoidFunction {
  (...args?: any[]): void
}

interface Json extends object {
  [key: string]: any;
}

type OrNull<T> = T | null;

type OrUndef<T> = T | undefined;