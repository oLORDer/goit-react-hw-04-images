import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './modal.module.scss';

export default function Modal({ onModalFunc, src }) {
  useEffect(() => {
    window.addEventListener('keydown', modalClose);
    return () => window.removeEventListener('keydown', modalClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCloseOverlay = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onModalFunc(false);
  };

  const modalClose = e => {
    if (e.code !== 'Escape') {
      return;
    }
    onModalFunc(false);
  };

  return (
    <div className={s.overlay} onClick={onCloseOverlay}>
      <div className={s.modal}>
        <img src={src} alt="smt" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string,
  onModalFunc: PropTypes.func,
};
