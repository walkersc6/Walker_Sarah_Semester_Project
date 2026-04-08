// useFetch

import { useEffect, useState } from 'react'
import type { AsyncState } from '../types/asyncState'

export function useFetch<T>(path: string | null) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' }) // default state is idle

  useEffect(() => {
    if (!path) return

    setState({ status: 'loading' })

    const controller = new AbortController()

    fetch(`/api/deezer?path=${encodeURIComponent(path)}`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => setState({ status: 'success', data }))
      .catch(err => {
        if (err.name === 'AbortError') return
        setState({ status: 'error', message: err.message })
      })

    return () => controller.abort()
  }, [path])

  return state
}