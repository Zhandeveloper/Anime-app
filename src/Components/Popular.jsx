import React from 'react'
import { useGlobalContext } from '../context/global';
import { Link } from 'react-router-dom';
import '../App.css'
function Popular({rendered}) {
  const {popularAnime, isSearch, searchResults} = useGlobalContext()

  const conditionRender= () => {
    if(!isSearch && rendered === 'popular'){
      return popularAnime.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.jpg.large_image_url} alt='anime_img'/>
          <p>{anime.title_english ? anime.title_english : anime.title}</p>
          
        </Link>
      })
    }
    else{
      return searchResults.map((anime)=>{
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.jpg.large_image_url} alt='anime_img'/>
          <p>{anime.title_english ? anime.title_english : anime.title}</p>
        </Link>
      })
    }
  }
  return (
    <div>
      <div className='card-anime'>
        {conditionRender()}
      </div>
    </div>
  )
}

export default Popular;