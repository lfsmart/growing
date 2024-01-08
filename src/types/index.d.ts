interface VoidFunction {
  (...args?: any[]): () => void
}

interface Json extends object {
  [ key: string ]: any
}


namespace Fetch {
  type Method = 'post' | 'get' | 'delete' | 'options' | 'patch';

  type Data<T> = {
  }

  type Params = {
    url: string;
    method: Method;
    data: Json
  }
}

 