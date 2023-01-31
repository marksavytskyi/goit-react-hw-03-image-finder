import PropTypes from 'prop-types';

function ImageGalleryItem({ webformatURL, toggleModal }) {
  return (
    <li className="ImageGalleryItem" onClick={toggleModal}>
      <img className="ImageGalleryItem-image" src={webformatURL} alt="" />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  toggleModal: PropTypes.func,
};
