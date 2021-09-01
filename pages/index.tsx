import type { NextPage } from 'next'
import { mock, raw } from '@mockpiler/compiler'
// import { CompileMock } from '@mockpiler/type-compiler'

import TheHeader from '../components/singleton/TheHeader/TheHeader'
import TheMasonryGallery, {
  TheMasonryGalleryProps,
} from '../components/singleton/TheMasonryGallery/TheMasonryGallery'
import { useCallback, useRef, useState } from 'react'
import { useHideHeaderOnScroll } from '../hooks/useHideHeaderOnScroll'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'

const heights = [200, 300, 500, 800]

const context = {
  id: Math.random,
  image: () => {
    const height = heights[Math.floor(Math.random() * heights.length)]

    return {
      url: `https://picsum.photos/500/${height}`,
      height,
    }
  },
}

const template = `
  [
    (50) {
      id
      image
    }
  ]
`

const loadItems = (): TheMasonryGalleryProps['items'] =>
  mock(context)`${raw(template)}`

const Home: NextPage = () => {
  const headerRef = useRef<HTMLElement>()
  const [items, setItems] = useState(loadItems)

  useHideHeaderOnScroll(headerRef)
  useInfiniteScroll(
    useCallback(async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      setItems(items.concat(loadItems()))
    }, [])
  )

  return (
    <>
      <TheHeader ref={ref => (headerRef.current = ref!)} />
      <TheMasonryGallery items={items} />
    </>
  )
}

export default Home
