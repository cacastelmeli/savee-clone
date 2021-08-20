import React, { useState } from 'react'
import type { IconType, IconBaseProps } from 'react-icons'
import { BsSearch, BsCursor } from 'react-icons/bs'
import tw from 'tailwind-styled-components'

const HeaderMenuList = tw.ul`
  flex
`

interface HeaderMenuItemButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  Icon?: IconType
  iconProps?: IconBaseProps
}

const HeaderMenuItemButton: React.FC<HeaderMenuItemButtonProps> = ({
  children,
  Icon,
  iconProps,
  ...buttonProps
}) => {
  const [hovered, setHovered] = useState(false)

  const onHover = () => {
    setHovered(true)
  }

  const onUnhover = () => {
    setHovered(false)
  }

  return (
    <li>
      <button
        className="flex justify-center items-center"
        style={{ width: 44, height: 44 }}
        onMouseEnter={onHover}
        onMouseLeave={onUnhover}
        {...buttonProps}>
        {Icon && (
          <Icon
            className={`text-gray-${hovered ? '400' : '900'} ${
              iconProps?.className ?? ''
            }`}
            size={18}
            {...iconProps}
          />
        )}
        {children}
      </button>
    </li>
  )
}

const TheHeaderMenu: React.FC = () => {
  return (
    <HeaderMenuList>
      <HeaderMenuItemButton Icon={BsSearch} />
      <HeaderMenuItemButton
        Icon={BsCursor}
        iconProps={{ style: { transform: 'rotateY(180deg)' }, size: 20 }}
      />
    </HeaderMenuList>
  )
}

export default TheHeaderMenu
