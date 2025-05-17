import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../FeedComponents/Feed';
import Head from '../HelpersComponents/Head';

function UserProfile() {
  const { user } = useParams();

  return (
    <section>
      <Head title={user} />
      <div className='container mainSection'>
        <h1 className='containerTitle'>{user}</h1>
        <Feed user={user} />
      </div>
    </section>
  );
}

export default UserProfile;
