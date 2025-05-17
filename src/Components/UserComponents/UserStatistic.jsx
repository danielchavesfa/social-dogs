import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { STATS_GET } from '../../helpers/URL';
import Head from '../HelpersComponents/Head';
import Error from '../HelpersComponents/Error';
import Loading from '../HelpersComponents/Loading';

const UserStatsGraphics = React.lazy(() => import('./UserStatsGraphics'));

function UserStatistic() {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();

      await request(url, options);
    }

    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <React.Suspense fallback={null}>
        <Head title={'Estatísticas'} />
        <UserStatsGraphics data={data} />
      </React.Suspense>
    );
  else return null;
}

export default UserStatistic;
