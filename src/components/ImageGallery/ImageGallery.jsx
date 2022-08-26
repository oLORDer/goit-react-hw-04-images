import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import Pixabay from 'components/pixabayApi';
import ImageGalleryItem from './ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

import s from './imageGallery.module.scss';

export default function ImageGallery({ searchImages, page, onLoadMore }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [largePageSrc, setLargePageSrc] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchImages && searchImages !== '') {
      fetchApi();
    }

    async function fetchApi() {
      try {
        setLoading(true);
        const { data } = await Pixabay(page, searchImages);
        setImages(data.hits);
        setTotal(data.total);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchImages]);

  useEffect(() => {
    if (searchImages && searchImages !== '' && page !== 1) {
      fetchApi();
    }

    async function fetchApi() {
      try {
        setLoading(true);
        const { data } = await Pixabay(page, searchImages);
        setImages([...images, ...data.hits]);
        setTotal(data.total);
      } catch (er) {
        setError(er);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const modalOpen = largePageSrc => {
    setLargePageSrc(largePageSrc);
  };

  return (
    <>
      {loading && <Loader />}
      {images && (
        <>
          <ul className={s.gallery}>
            {images.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={nanoid()}
                id={id}
                url={webformatURL}
                largeUrl={largeImageURL}
                onClickFunc={modalOpen}
              />
            ))}
          </ul>
          {12 * page <= total && (
            <Button value={'Load more'} onBtnClick={onLoadMore} />
          )}
        </>
      )}
      {largePageSrc && <Modal src={largePageSrc} onModalFunc={modalOpen} />}
    </>
  );
}

ImageGallery.propTypes = {
  searchImages: PropTypes.string,
};
