import { createContext, useContext, useEffect, useRef, useState } from 'react'
import tw from 'tailwind-styled-components'

import { GalleryItem } from '../components/common/CommonMasonryGalleryItem/CommonMasonryGalleryItem'

interface SelectionBox {
  x: number
  y: number
  width: number
  height: number
}

interface SelectableGalleryContextValue {
  selectionBox: SelectionBox | null
  selectedItems: GalleryItem[]
  registerSelectableItem: (target: HTMLElement, item: GalleryItem) => void
  unregisterSelectableItem: (target: HTMLElement) => void
}

export const useSelectableGallery = () => useContext(SelectableGalleryContext)

const SelectableGalleryContext = createContext<SelectableGalleryContextValue>(
  // Default value should never be used
  null as any
)

const StyledSelectionArea = tw.div`
  absolute
  bg-gray-900
  opacity-50
  z-10
  border
  border-black
`

const SelectionArea: React.FC = () => {
  const { selectionBox } = useSelectableGallery()

  return (
    selectionBox && (
      <StyledSelectionArea
        style={{
          top: selectionBox.y,
          left: selectionBox.x,
          width: selectionBox.width,
          height: selectionBox.height,
        }}
      />
    )
  )
}

export const SelectableGalleryProvider: React.FC = ({ children }) => {
  const selectableItems = useRef(new Map<HTMLElement, GalleryItem>())

  const [selectedItems, setSelectedItems] = useState<
    SelectableGalleryContextValue['selectedItems']
  >([])
  const [selectionBox, setSelectionBox] = useState<
    SelectableGalleryContextValue['selectionBox']
  >(null)

  const registerSelectableItem: SelectableGalleryContextValue['registerSelectableItem'] = (
    target,
    item
  ) => {
    selectableItems.current.set(target, item)
  }

  const unregisterSelectableItem: SelectableGalleryContextValue['unregisterSelectableItem'] = target => {
    selectableItems.current.delete(target)
  }

  const isBoxIntersected = (
    selectionBox: SelectionBox,
    target: HTMLElement
  ) => {
    const boundingBox = target.getBoundingClientRect()
    const boundingX = boundingBox.x + document.scrollingElement!.scrollLeft
    const boundingY = boundingBox.y + document.scrollingElement!.scrollTop

    if (boundingX + boundingBox.width < selectionBox.x) {
      return false
    }

    if (boundingX > selectionBox.x + selectionBox.width) {
      return false
    }

    if (boundingY + boundingBox.height < selectionBox.y) {
      return false
    }

    if (boundingY > selectionBox.y + selectionBox.height) {
      return false
    }

    return true
  }

  const computeSelectedItems = (selectionBox: SelectionBox) => {
    const nextSelectedItems: GalleryItem[] = []

    for (const [target, selectableItem] of selectableItems.current) {
      if (isBoxIntersected(selectionBox, target)) {
        nextSelectedItems.push(selectableItem)
      }
    }

    setSelectedItems(nextSelectedItems)
  }

  useEffect(() => {
    if (selectionBox) {
      computeSelectedItems(selectionBox)
    }
  }, [selectionBox])

  useEffect(() => {
    let currentSelectionBox: SelectionBox | null = null

    const onMousemoveHandler = (e: MouseEvent) => {
      const { x, y } = currentSelectionBox!

      const nextSelectionBox = {
        x: Math.min(e.pageX, x),
        y: Math.min(e.pageY, y),
        width: Math.abs(e.pageX - x),
        height: Math.abs(e.pageY - y),
      }

      setSelectionBox(nextSelectionBox)
    }

    document.addEventListener('mousedown', e => {
      const nextSelectionBox = {
        x: e.pageX,
        y: e.pageY,
        width: 0,
        height: 0,
      }

      setSelectionBox((currentSelectionBox = nextSelectionBox))
      document.addEventListener('mousemove', onMousemoveHandler)
    })

    document.addEventListener('mouseup', () => {
      setSelectionBox((currentSelectionBox = null))
      document.removeEventListener('mousemove', onMousemoveHandler)
    })
  }, [])

  return (
    <SelectableGalleryContext.Provider
      value={{
        selectedItems,
        selectionBox,
        registerSelectableItem,
        unregisterSelectableItem,
      }}>
      <div style={{ position: 'relative' }}>
        <SelectionArea />
        {children}
      </div>
    </SelectableGalleryContext.Provider>
  )
}
