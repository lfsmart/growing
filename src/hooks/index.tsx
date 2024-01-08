import { useState } from 'react'

export const useFetch = (
  url: string | Fetch.Params,
  method: Fetch.Method = 'get',
  data?: Json
) => {
  const [state, setState] = useState()
  const [loading, setLoading] = useState(false)

  if (typeof url === 'string') {
    fetch(url)
  }

  return
}
