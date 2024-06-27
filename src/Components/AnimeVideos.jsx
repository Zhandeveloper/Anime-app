import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AnimeVideos() {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate(); // Заменим useHistory на useNavigate

  const getVideos = async (animeId) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/videos`);
      const data = await response.json();
      console.log([...data.data.promo, ...data.data.music_videos]); // Вывод объединенного массива в консоль
      setVideos([...data.data.promo, ...data.data.music_videos]);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    getVideos(id);
  }, [id]);

  return (
    <div className='anime-videos'>
      <div className="videos">
      <button onClick={() => navigate(-1)} className='back g-btn'>
          <i className='fas fa-arrow-left'></i>Back
        </button>
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="video">
                
              <div>
              <a  href={video.trailer?.url || video.video?.url} target="_blank" rel="noopener noreferrer">
                <h3 className='video-link'>{video.title || video.meta?.title || 'No Title'}</h3>
              </a>
              </div>
              <iframe className='video-player'
                src={`${video.trailer?.embed_url || video.video?.embed_url}&mute=1`} 
                title={video.title || video.meta?.title || 'No Title'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {video.meta && (
                <p>
                  <strong>Author:</strong> {video.meta.author || 'Unknown'}
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </div>
  );
}

export default AnimeVideos;
