import Masonry from 'react-masonry-css'
import { BsPlus } from 'react-icons/bs'

export interface GalleryItem {
  id: number
  image: {
    url: string
    height: number
  }
}

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
        <div key={item.id} style={{ height: item.image.height }}>
          <figure className="gallery-image-container">
            <img className="object-cover w-full h-full" src={item.image.url} />

            <figcaption className="hidden absolute bottom-3 right-3">
              <button className="bg-gray-900 p-2 hover:opacity-80">
                <BsPlus className="text-white" size={25} />
              </button>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  )
}

export default TheMasonryGallery
