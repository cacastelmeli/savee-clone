import { SelectableItem } from '@aeroxmotion/react-selectable'
import { BsPlus } from 'react-icons/bs'

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
  return (
    <SelectableItem
      style={{
        height: item.image.height,
      }}>
      {({ selecting, selected }) => (
        <figure
          className={`gallery-image-container ${
            selected || selecting ? 'selected' : ''
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
      )}
    </SelectableItem>
  )
}

export default CommonMasonryGalleryItem
