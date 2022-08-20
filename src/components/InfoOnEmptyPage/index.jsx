import React from 'react';
import { Link } from 'react-router-dom';

import Arrow from '../../assets/img/hero/arrow.svg';

const InfoOnEmptyPage = ({ title, text, emoji }) => {
  return (
    <div className="empty-page">
      <div className="empty-page__body">
        <img src={emoji} alt="emoji" className="body-empty-page__emoji" />
        <div className="body-empty-page__title">
          <h1>{title}</h1>
        </div>
        <div className="body-empty-page__text">
          <p>{text}</p>
        </div>
      </div>
      <Link to="/">
        <button className="overlay-price__green-button overlay-body__back-button body-empty-page__button ">
          Вернуться назад <img src={Arrow} alt="Arrow" />
        </button>
      </Link>
    </div>
  );
};

export default InfoOnEmptyPage;
