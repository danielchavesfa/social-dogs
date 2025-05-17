import React from 'react';
import styles from './Home.module.css';
import Feed from '../FeedComponents/Feed';
import Head from '../HelpersComponents/Head';

function Home() {
  return (
    <section className={`mainContainer ${styles.homeBg}`}>
      <Head title={'Fotos'} description={'Home Dogs, todas as fotos do feed.'} />
      <div className='container'>
        <Feed />
      </div>
    </section>
  );
}

export default Home;
