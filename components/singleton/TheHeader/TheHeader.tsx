import tw from 'tailwind-styled-components'
import { forwardRef } from 'react'

import CommonLogo from '../../common/CommonLogo/CommonLogo'
import TheHeaderMenu from '../TheHeaderMenu/TheHeaderMenu'

const HeaderContainer = tw.header`
  sticky
  top-0
  flex
  justify-between
  items-center
  px-16
  py-5
  bg-white
  z-10
`

export interface TheHeaderProps extends React.HTMLAttributes<HTMLElement> {}

const TheHeader = forwardRef<HTMLElement, TheHeaderProps>(
  ({ children, ...headerProps }, ref) => {
    return (
      <HeaderContainer ref={ref} {...headerProps}>
        <a href="#" title="Home">
          <CommonLogo />
        </a>

        {children}
      </HeaderContainer>
    )
  }
)

export default TheHeader
