// import Masonry from 'react-masonry-css'
import { SelectableArea, SelectionBox } from '@aeroxmotion/react-selectable'
import CommonMasonryGalleryItem, {
  GalleryItem,
} from '../../common/CommonMasonryGalleryItem/CommonMasonryGalleryItem'

export interface TheMasonryGalleryProps {
  items: GalleryItem[]
}

const TheMasonryGallery: React.FC<TheMasonryGalleryProps> = ({ items }) => {
  return (
    <SelectableArea
      id="gallery"
      options={{
        toggleOnClick: true,
        selectionMode: 'shift',
      }}>
      {items.map(item => (
        <CommonMasonryGalleryItem key={item.id} item={item} />
      ))}

      <SelectionBox />
    </SelectableArea>
  )
}

export default TheMasonryGallery
