import React from 'react';

import EmptyBox from '../../assets/img/hero/cart/empty-box.png';
import Arrow from '../../assets/img/hero/arrow.svg';

export const CartEmprty = ({ closeCart }) => {
  return (
    <div className="overlay-body">
      <div className="overlay-body__image">
        <img src={EmptyBox} alt="empty-box" />
      </div>
      <div className="overlay-body__title">
        <h3>Корзина пуста</h3>
      </div>
      <div className="overlay-body__text">
        <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
      </div>
      <button onClick={closeCart} className="overlay-price__green-button overlay-body__back-button">
        Вернуться назад <img src={Arrow} alt="Arrow" />
      </button>
    </div>
  );
};
