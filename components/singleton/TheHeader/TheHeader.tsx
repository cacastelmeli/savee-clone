import tw from 'tailwind-styled-components'

import CommonLogo from '../../common/CommonLogo/CommonLogo'

const HeaderContainer = tw.header`
  flex
  justify-between
  py-10
  px-4
`

const TheHeader: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  ...headerProps
}) => {
  return (
    <HeaderContainer {...headerProps}>
      <CommonLogo />
    </HeaderContainer>
  )
}

export default TheHeader
