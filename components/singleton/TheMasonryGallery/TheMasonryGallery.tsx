import Masonry from 'react-masonry-css'
import { BsPlus } from 'react-icons/bs'
import './TheMasonryGallery.css'
import { useEffect } from 'react'

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
  useEffect(() => {
    const $masonryGallery = document.getElementById('gallery')!
    const onGalleryScroll = (e: Event) => {
      console.log('e:', e)
    }

    $masonryGallery.addEventListener('scroll', onGalleryScroll)
  }, [])

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
              <button className="bg-gray-900 p-2">
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
