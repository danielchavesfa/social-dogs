import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_GET } from '../../helpers/URL';
import Error from '../HelpersComponents/Error';
import Loading from '../HelpersComponents/Loading';
import PhotoContent from '../PhotoComponents/PhotoContent';
import Head from '../HelpersComponents/Head';

function Photo() {
  const { id } = useParams();
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(id);

    request(url, options);
  }, [id, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className='mainContainer'>
        <Head title={data.photo.title} />
        <div className='container'>
          <PhotoContent data={data} single={true} />
        </div>
      </section>
    );
  else return null;
}

export default Photo;
