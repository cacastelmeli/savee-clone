import Masonry from 'react-masonry-css'
import CommonMasonryGalleryItem, {
  GalleryItem,
} from '../../common/CommonMasonryGalleryItem/CommonMasonryGalleryItem'

export interface TheMasonryGalleryProps {
  items: GalleryItem[]
}

const TheMasonryGallery: React.FC<TheMasonryGalleryProps> = ({ items }) => {
  return (
    <Masonry
      id="gallery"
      breakpointCols={{ default: 3 }}
      className="masonry-gallery"
      columnClassName="masonry-gallery__column">
      {items.map(item => (
        <CommonMasonryGalleryItem key={item.id} item={item} />
      ))}
    </Masonry>
  )
}

export default TheMasonryGallery
