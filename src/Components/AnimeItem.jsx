import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import youtube_img from '../img/youtube-img.png'
function AnimeItem() {
  const { id } = useParams();

  // State
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);

  //Navigation logic
  const navigate = useNavigate(); // Заменим useHistory на useNavigate

  // Destructuring anime
  const {
    title, title_english, synopsis,
    trailer, duration, aired,
    season, images, rank,
    score, scored_by, popularity,
    status, rating, source, episodes,
    genres, studios, themes
  } = anime;

  // Function to get anime data
  const getAnime = async (animeId) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
      const data = await response.json();
      setAnime(data.data);
    } catch (error) {
      console.error('Error fetching anime:', error);
    }
  };

  // Function to get characters data
  const getCharacters = async (animeId) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
      const data = await response.json();
      setCharacters(data.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, []);

  return (
    <div className='anime-item'>

      <h1><button onClick={() => navigate(-1)} className='back'>
        <i className='fas fa-arrow-left'></i>Back
      </button> {title_english ? title_english : title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            {images?.jpg?.large_image_url && (
              <img src={images.jpg.large_image_url} alt="img" className='anime-img' />
            )}
          </div>
          <div className="anime-details">
            <p><span>Aired:</span><span>{aired?.string}</span></p>
            <p><span>Rating:</span><span>{rating}</span></p>
            <p><span>Rank:</span><span>{rank}</span></p>
            <p><span>Score:</span><span>{score}</span></p>
            <p><span>Scored by:</span><span>{scored_by}</span></p>
            <p><span>Popularity:</span><span>{popularity}</span></p>
            <p><span>Status:</span><span>{status}</span></p>
            <p><span>Source:</span><span>{source}</span></p>
            <p><span>Season:</span><span>{season}</span></p>
            <p>
              <span>Studios:</span>
              <span>
                {studios?.map((studio, index) => (
                  <span key={index}>
                    <a href={studio.url} target="_blank" rel="noopener noreferrer" className="details-a">{studio.name}</a>
                    {index !== studios.length - 1 && ', '}
                  </span>
                ))}
              </span>
            </p>
            <p><span>Duration:</span><span>{duration}</span></p>
            <p><span>Episodes:</span><span>{episodes}</span></p>
            <p>
              <span>Genres:</span>
              <span>
                {genres?.map((genre, index) => (
                  <span key={index}>
                    <a href={genre.url} target="_blank" rel="noopener noreferrer" className='details-a'>{genre.name}</a>
                    {index !== genres.length - 1 && ', '}
                  </span>
                ))}
              </span>
            </p>
            <p>
              <span>Themes:</span>
              <span>
                {themes?.map((theme, index) => (
                  <span key={index}>
                    <a href={theme.url} target="_blank" rel="noopener noreferrer" className='details-a'>{theme.name}</a>
                    {index !== themes.length - 1 && ', '}
                  </span>
                ))}
              </span>
            </p>



          </div>
        </div>
        <p className="description">
          {showMore ? synopsis : `${synopsis?.substring(0, 450)}...`}
          <button onClick={() => setShowMore(!showMore)} className='btn-ShowMore'>
            {showMore ? 'Show less' : 'Read more'}
          </button>
        </p>
      </div>
      <div className='title-box'>
        <a className='title-trailer' href={trailer?.url || '#'} target='_blank'>Trailer</a>
      </div>
      <div className="trailer-container">
        {trailer?.embed_url ? (
          <iframe className='video-player'
            src={trailer.embed_url}
            title="Inline Frame Example"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <h3>Trailer not available</h3>
        )}
      </div>
      <div className='box-characters-h3'><h3>Characters</h3></div>
      <div className="characters">
        {characters?.map((character, index) => {
          const { role } = character;
          const { images, name, mal_id } = character.character;
          return (
            <Link to={{ pathname: `/character/${mal_id}`, state: { characterName: name } }} key={index}>
              <div className="character">
                <img src={images?.jpg.image_url} alt="" />
                <h4>{name}</h4>
                <p>{role}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default AnimeItem;
