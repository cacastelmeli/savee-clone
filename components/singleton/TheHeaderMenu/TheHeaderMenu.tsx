import React, { useState } from 'react'
import classNames from 'classnames'
import type { IconType, IconBaseProps } from 'react-icons'
import { BsSearch, BsCursor, BsCursorFill } from 'react-icons/bs'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
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
            {...iconProps}
            className={classNames(
              `text-gray-${hovered ? '400' : '700'}`,
              iconProps?.className
            )}
            size={iconProps?.size ?? 18}
          />
        )}
        {children}
      </button>
    </li>
  )
}

interface TheHeaderProps {
  selectionEnabled: boolean
  onSelectionEnabledChange: (nextSelectionEnabled: boolean) => void
}

const TheHeaderMenu: React.FC<TheHeaderProps> = ({
  selectionEnabled,
  onSelectionEnabledChange,
}) => {
  return (
    <HeaderMenuList>
      <HeaderMenuItemButton Icon={BsSearch} />
      <HeaderMenuItemButton
        Icon={selectionEnabled ? BsCursorFill : BsCursor}
        iconProps={{
          style: { transform: 'rotateY(180deg)' },
          size: 20,
        }}
        onClick={() => onSelectionEnabledChange(!selectionEnabled)}
      />
      <HeaderMenuItemButton
        Icon={BiDotsHorizontalRounded}
        iconProps={{ size: 25 }}
      />
    </HeaderMenuList>
  )
}

export default TheHeaderMenu
