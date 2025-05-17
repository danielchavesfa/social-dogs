import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserContext from '../../Contexts/UserContext';
import Feed from '../FeedComponents/Feed';
import UserPhotoPost from './UserPhotoPost';
import UserStatistic from './UserStatistic';
import NotFound from '../HelpersComponents/NotFound';
import Head from '../HelpersComponents/Head';

function User() {
  const { data } = React.useContext(UserContext);

  return (
    <section>
      <Head title={'Minha Conta'} />
      <div className='container'>
        <UserHeader />
        <Routes>
          <Route path='/' element={<Feed user={data} />} />
          <Route path='postar' element={<UserPhotoPost />} />
          <Route path='estatisticas' element={<UserStatistic />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
}

export default User;
