import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const Head = () => {
  const [ count, setCount ] = useState( 0 );
  throw new Error( 'wrong!' )
  return <div> hello Head, { count }</div>
}

export const ReactErrorBoundary = () => {
  return (
    <ErrorBoundary fallback={ <div>render is wrong!</div> }>
      <Head></Head>
    </ErrorBoundary>
  );
}