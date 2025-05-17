import React from 'react';
import styles from './FeedPhotos.module.css';
import FeedPhotoItem from './FeedPhotoItem';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../helpers/URL';
import Error from '../HelpersComponents/Error';
import Loading from '../HelpersComponents/Loading';

function FeedPhotos({ page, setModalPhoto, user, setInfinite }) {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6;
      const { url, options } = PHOTOS_GET({ page, total, user: user && user.id });
      const { response, json } = await request(url, options);

      if (response && response.ok && json.length < total) {
        setInfinite(false);
      }
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return (
      <ul className={`anime ${styles.feed}`}>
        {data.map((photo) => {
          return <FeedPhotoItem key={photo.id} photo={photo} setModalPhoto={setModalPhoto} />;
        })}
      </ul>
    );
  }

  return null;
}

export default FeedPhotos;
