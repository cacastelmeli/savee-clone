import { useEffect } from 'react'

const BOTTOM_OFFSET = 3000

export const useInfiniteScroll = (cb: () => Promise<void>) => {
  useEffect(() => {
    let callingCb = false

    const { documentElement: $scroll } = document
    const onScroll = (e: Event) => {
      if (callingCb) {
        return
      }

      const topScrollTreshold = $scroll.scrollHeight - BOTTOM_OFFSET

      if (topScrollTreshold > 0 && $scroll.scrollTop > topScrollTreshold) {
        callingCb = true

        cb().finally(() => {
          callingCb = false
        })
      }
    }

    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [cb])
}
