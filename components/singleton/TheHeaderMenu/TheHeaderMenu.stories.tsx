import { ComponentStory, ComponentMeta } from '@storybook/react'

import TheHeaderMenu from './TheHeaderMenu'

const componentStoryMeta: ComponentMeta<typeof TheHeaderMenu> = {
  title: 'Singleton/TheHeaderMenu',
  component: TheHeaderMenu,
}

const Template: ComponentStory<typeof TheHeaderMenu> = args => (
  <TheHeaderMenu {...args} />
)

export const Default = Template.bind({})
export default componentStoryMeta
