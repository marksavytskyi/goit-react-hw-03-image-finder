import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

function ImageGallery({ response, toggleModal }) {
  return (
    <ul className="ImageGallery">
      {response.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            toggleModal={() => toggleModal(largeImageURL)}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  response: PropTypes.arrayOf(Object),
  toggleModal: PropTypes.func,
};
