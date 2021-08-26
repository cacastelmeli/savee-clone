import type { NextPage } from 'next'
import { mock, raw } from '@mockpiler/compiler'
import { CompileMock } from '@mockpiler/type-compiler'

import TheHeader from '../components/singleton/TheHeader/TheHeader'
import TheMasonryGallery, {
  TheMasonryGalleryProps,
} from '../components/singleton/TheMasonryGallery/TheMasonryGallery'
import { useRef } from 'react'
import { useHideHeaderOnScroll } from '../hooks/useHideHeaderOnScroll'
import { SelectableGalleryProvider } from '../hooks/useSelectableGallery'

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
    (30) {
      id
      image
    }
  ]
`

const items: TheMasonryGalleryProps['items'] = mock(context)`${raw(
  template
)}` as CompileMock<typeof template, typeof context>

const Home: NextPage = () => {
  const headerRef = useRef<HTMLElement>()

  useHideHeaderOnScroll(headerRef)

  return (
    <SelectableGalleryProvider>
      <TheHeader ref={ref => (headerRef.current = ref!)} />

      <TheMasonryGallery items={items} />
    </SelectableGalleryProvider>
  )
}

export default Home
