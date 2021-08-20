import tw from 'tailwind-styled-components'

import CommonLogo from '../../common/CommonLogo/CommonLogo'
import TheHeaderMenu from '../TheHeaderMenu/TheHeaderMenu'

const HeaderContainer = tw.header`
  flex
  justify-between
  items-center
  px-16
  py-5
  bg-white
`

const TheHeader: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  ...headerProps
}) => {
  return (
    <HeaderContainer {...headerProps}>
      <a href="#" title="Home">
        <CommonLogo />
      </a>

      <TheHeaderMenu />
    </HeaderContainer>
  )
}

export default TheHeader
