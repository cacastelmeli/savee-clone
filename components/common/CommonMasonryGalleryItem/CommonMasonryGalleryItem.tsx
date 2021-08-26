import { BsPlus } from 'react-icons/bs'

import { useSelectableGallery } from '../../../hooks/useSelectableGallery'

export interface GalleryItem {
  id: number
  image: {
    url: string
    height: number
  }
}

export interface CommonMasonryGalleryItemProps {
  item: GalleryItem
}

const CommonMasonryGalleryItem: React.FC<CommonMasonryGalleryItemProps> = ({
  item,
}) => {
  const {
    registerSelectableItem,
    selectedItems,
    // TODO: unregisterSelectableItem,
  } = useSelectableGallery()

  return (
    <div
      key={item.id}
      ref={ref => {
        if (ref) {
          registerSelectableItem(ref, item)
        }
      }}
      style={{
        height: item.image.height,
      }}>
      <figure
        className={`gallery-image-container ${
          selectedItems.includes(item) ? 'selected' : ''
        }`}>
        <img
          draggable="false"
          className="object-cover w-full h-full"
          src={item.image.url}
        />

        <figcaption className="hidden absolute bottom-3 right-3">
          <button className="bg-gray-900 p-2 hover:opacity-80">
            <BsPlus className="text-white" size={25} />
          </button>
        </figcaption>
      </figure>
    </div>
  )
}

export default CommonMasonryGalleryItem
