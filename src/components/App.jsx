import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import s from './app.module.css';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const hendleFormSubmit = q => {
    if (query === q) {
      toast.warning('choose deferent');
      return;
    }
    setQuery(q);
    setPage(1);
    toast.success('hendleFormSubmit');
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={hendleFormSubmit} />
      <main>
        <ImageGallery
          searchImages={query}
          page={page}
          onLoadMore={() => setPage(page + 1)}
        />
        <ToastContainer autoClose={2000} hideProgressBar={true} />
      </main>
    </div>
  );
}
