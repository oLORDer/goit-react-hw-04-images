import PropTypes from 'prop-types';
import s from './imageGallery.module.scss';

export default function ImageGalleryItem({ id, url, largeUrl }) {
  const getDataValue = ({ target }) => {
    this.props.onClickFunc(target.dataset.largeimg);
  };

  return (
    <li className={s.item}>
      <img
        src={url}
        alt="imagess"
        data-id={id}
        data-largeimg={largeUrl}
        onClick={getDataValue}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  largeUrl: PropTypes.string,
  url: PropTypes.string,
  onClickFunc: PropTypes.func,
};
