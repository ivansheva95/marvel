import { useState, useCallback } from 'react'

export const useHttp = () => {
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)
  const [process, setProcess] = useState('waiting')

  const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'aplication/json' }) => {
    // setLoading(true)
    setProcess('loading')

    try {
      const response = await fetch(url, { method, body, headers })

      if (!response.ok) {
        throw new Error(response.status)
      }

      // setLoading(false)
      return response.json()

    } catch (e) {
      // setLoading(false)
      // setError(e.message)
      setProcess('error')
      throw e
    }
  }, [])

  // const clearError = useCallback(() => setError(null), [])

  return {
    // loading,
    // error,
    process,
    setProcess,
    request,
    // clearError
  }
}