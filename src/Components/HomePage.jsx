import React, { useState } from 'react';
import Popular from './Popular';
import Upcoming from './Upcoming';
import Airing from "./Airing";
import { useGlobalContext } from '../context/global';
import { useTheme } from '../context/ThemeContext';
import endo_img from '../img/endo-footer.png';
import naruto_img from '../img/naruto-footer.png';
import search_img from '../img/search-img.png';
import sun_img from '../img/sun.png';
import moon_img from '../img/moon.png';
import not_found_img from '../img/404_not_found.png'
function HomePage() {
  const { handleSubmit, search, handleChange, noResults, getPopularAnime, getUpcomingAnime, getAiringAnime } = useGlobalContext();
  const [rendered, setRendered] = useState('popular');
  const { toggleTheme, isDarkTheme } = useTheme();
  const { headerBack } = useTheme();

  const switchComponent = () => {
    switch (rendered) {
      case 'popular':
        return <Popular rendered={rendered} />;
      case 'upcoming':
        return <Upcoming rendered={rendered} />;
      case 'airing':
        return <Airing rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  return (
    <div>
      <header style={{ backgroundImage: `url(${headerBack})` }}>
        <div className="search-container">
          <div className="title-container">
            <h1 className='title'>
              {rendered === 'popular' ? 'Popular Anime' :
                rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}
            </h1>
          </div>
          <div className="search-container">
            <form action="" className="search-form" onSubmit={handleSubmit}>
              <div className="input-control">
                <input type="text" placeholder="Search Anime" value={search} onChange={handleChange} />
                <button type="submit">Search <img src={search_img} alt="search_img" className='search-img' /></button>
              </div>
            </form>
          </div>
          <button onClick={() => { setRendered('popular'); }}>Popular</button>
          <button onClick={() => { setRendered('airing'); getAiringAnime(); }}>Airing</button>
          <button onClick={() => { setRendered('upcoming'); getUpcomingAnime(); }}>Upcoming</button>
          <button onClick={toggleTheme} className='change-theme-btn'>
            <img src={isDarkTheme ? moon_img : sun_img} alt={isDarkTheme ? 'Moon' : 'Sun'} className='change-theme-img' />
          </button>
        </div>
      </header>
      {noResults && <div className='not-found'><img  src={not_found_img} alt='not-found'/></div>}
      {switchComponent()}
      <footer>
        <img src={endo_img} alt="endo" />
        <a href="https://t.me/Zhan2018" target='_blank'>Created by the developer Zhan</a>
        <img src={naruto_img} alt="naruto" />
      </footer>
    </div>
  );
}

export default HomePage;
