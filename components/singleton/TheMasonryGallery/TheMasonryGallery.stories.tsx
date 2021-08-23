import { ComponentStory, ComponentMeta } from '@storybook/react'
import { mock, raw } from '@mockpiler/compiler'
import { CompileMock } from '@mockpiler/type-compiler'

import TheMasonryGallery, { TheMasonryGalleryProps } from './TheMasonryGallery'

const componentStoryMeta: ComponentMeta<typeof TheMasonryGallery> = {
  title: 'Singleton/TheMasonryGallery',
  component: TheMasonryGallery,
}

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

const Template: ComponentStory<typeof TheMasonryGallery> = args => (
  <TheMasonryGallery {...args} />
)

export const Default = Template.bind({})

Default.args = {
  items,
}

export default componentStoryMeta
