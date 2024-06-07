import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/global';

function Gallery() {
  const { getAnimePictures, pictures } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate(); // Заменим useHistory на useNavigate

  //state
  const [index, setIndex] = useState(0)

  const hadleImageClick = (i) => {
    setIndex(i)
  }

  useEffect(() => {
    getAnimePictures(id);
  }, []);

  return (
    <>
    {/* Используем navigate для перехода назад */}
    
        <div className='gallery'>
        <button onClick={() => navigate(-1)} className='back g-btn'>
          <i className='fas fa-arrow-left'></i>Back
        </button>
      <div className="big-image">
        <img src={pictures[index]?.jpg.image_url} alt="big-img" />
      </div>
      <div className="small-images">
        {pictures?.map((picture, i) => (
          <div className='image-container' onClick={() => {
            hadleImageClick(i)
          }} key={i}>
            <img
              src={picture.jpg.image_url}
              style={{
                border: i === index ? "3px solid #4A66E6" : "3px solid #e5e7eb",
                transform: i === index ? 'scale(1.1)' : 'scale(1)',
                transition: 'all .3s ease-in-out'
              }}
              alt='character-img'
            />
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
}

export default Gallery;
