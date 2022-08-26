import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import s from './app.module.css';

export function App() {
  const [query, setQuery] = useState('');

  const hendleFormSubmit = q => {
    if (query === q) {
      toast.warning('choose deferent');
      return;
    }
    setQuery(q);
    toast.success('hendleFormSubmit');
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={hendleFormSubmit} />
      <main>
        <ImageGallery searchImages={query} />
        <ToastContainer autoClose={2000} hideProgressBar={true} />
      </main>
    </div>
  );
}
