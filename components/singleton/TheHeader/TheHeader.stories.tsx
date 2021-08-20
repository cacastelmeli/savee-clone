import { ComponentStory, ComponentMeta } from '@storybook/react'

import TheHeader from './TheHeader'

const componentStoryMeta: ComponentMeta<typeof TheHeader> = {
  title: 'Singleton/TheHeader',
  component: TheHeader,
}

const Template: ComponentStory<typeof TheHeader> = args => (
  <TheHeader {...args} />
)

export const Default = Template.bind({})
export default componentStoryMeta
