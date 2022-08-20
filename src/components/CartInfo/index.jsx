import React from 'react';

import Arrow from '../../assets/img/hero/arrow.svg';

export const CartInfo = ({ closeCart, title, text, image }) => {
  return (
    <div className="overlay-body">
      <div className="overlay-body__image">
        <img src={image} alt="empty-box" />
      </div>
      <div className="overlay-body__title">
        <h3>{title}</h3>
      </div>
      <div className="overlay-body__text">
        <p>{text}</p>
      </div>
      <button
        onClick={closeCart}
        className="overlay-price__green-button overlay-body__back-button overlay-body__loading">
        Вернуться назад <img src={Arrow} alt="Arrow" />
      </button>
    </div>
  );
};
