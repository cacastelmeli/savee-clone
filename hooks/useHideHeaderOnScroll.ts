import { MutableRefObject, useEffect } from 'react'

export const useHideHeaderOnScroll = (
  ref: MutableRefObject<HTMLElement | void | null>
) => {
  useEffect(() => {
    let lastScroll = 0
    let headerOffset = 0

    const onDocumentScroll = (e: Event) => {
      const { current: $header } = ref
      const { scrollingElement: $scroll } = document

      if (!$scroll || !$header) {
        return
      }

      const { height: headerHeight } = $header.getBoundingClientRect()

      const currentScroll = $scroll.scrollTop
      const scrollDiff = lastScroll - currentScroll
      lastScroll = currentScroll

      headerOffset = Math.min(
        0,
        Math.max(headerOffset + scrollDiff, -headerHeight)
      )

      Object.assign($header.style, {
        transform: `translate3d(0, ${headerOffset}px, 0)`,
        transition: 'all 15ms linear',
      })
    }

    document.addEventListener('scroll', onDocumentScroll)

    return () => document.removeEventListener('scroll', onDocumentScroll)
  }, [ref.current])
}
