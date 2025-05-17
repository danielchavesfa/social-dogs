import React from 'react';
import PropTypes from 'prop-types';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

function Feed({ user }) {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    let wait = false;
    const windowEvents = ['wheel', 'scroll'];

    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;

        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;

          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }

    windowEvents.forEach((event) => window.addEventListener(event, infiniteScroll));

    return () => {
      windowEvents.forEach((event) => window.removeEventListener(event, infiniteScroll));
    };
  }, [infinite]);

  return (
    <div>
      <div className='container'>
        {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
        {pages.map((page) => (
          <FeedPhotos
            key={page}
            user={user}
            page={page}
            setModalPhoto={setModalPhoto}
            setInfinite={setInfinite}
          />
        ))}
      </div>
    </div>
  );
}

Feed.defaultProps = {
  user: 0,
};

Feed.PropTypes = {
  user: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
};

export default Feed;
