import React from 'react';
import { useGlobalContext } from '../context/global';
import { Link } from 'react-router-dom';
import '../App.css';

function Upcoming({ rendered }) {
  const { upcomingAnime, isSearch, searchResults } = useGlobalContext();

  const conditionRender = () => {
    console.log('upcomingAnime:', upcomingAnime);
    console.log('isSearch:', isSearch);
    console.log('searchResults:', searchResults);

    if (!isSearch && rendered === 'upcoming') {
      return (
        Array.isArray(upcomingAnime) &&
        upcomingAnime.map((anime) => (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt='anime_img' />
            <p>{anime.title_english ? anime.title_english : anime.title}</p>
          </Link>
        ))
      );
    } else {
      return (
        Array.isArray(searchResults) &&
        searchResults.map((anime) => (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt='anime_img' />
            <p>{anime.title_english ? anime.title_english : anime.title}</p>
          </Link>
        ))
      );
    }
  };

  return (
    <div>
      <div className='card-anime'>
        {conditionRender()}
      </div>
    </div>
  );
}

export default Upcoming;
