// import Masonry from 'react-masonry-css'
import { useEffect } from 'react'
import {
  selectableArea,
  SelectionBox,
  useSelectableArea,
} from '@aeroxmotion/react-selectable'

import CommonMasonryGalleryItem, {
  GalleryItem,
} from '../../common/CommonMasonryGalleryItem/CommonMasonryGalleryItem'

export interface TheMasonryGalleryProps {
  items: GalleryItem[]
}

const TheMasonryGallery = selectableArea<TheMasonryGalleryProps>(
  ({ items }) => {
    const { areaRef, options, events } = useSelectableArea()

    useEffect(() => {
      if (!options.selectionEnabled) {
        // Deselect all items if selection is not enabled
        events.trigger('deselectAll')
      }
    }, [options.selectionEnabled])

    return (
      <div id="gallery" className="selectable-area" ref={areaRef as any}>
        {items.map(item => (
          <CommonMasonryGalleryItem key={item.id} item={item} />
        ))}

        <SelectionBox />
      </div>
    )
  }
)

export default TheMasonryGallery
