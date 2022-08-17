import React from 'react';
import AppContext from '../../context';

import Added from '../../assets/img/hero/add.svg';
import CheckAdded from '../../assets/img/hero/add-check.svg';
import Like from '../../assets/img/hero/like-btn.svg';
import CheckLike from '../../assets/img/hero/like-select-btn.svg';

const Card = ({
  id,
  price,
  title,
  imageUrl,
  addSneakersToCart,
  additemToFavorites,
}) => {
  const { wasAddedInCart, wasAddedInFavorites } = React.useContext(AppContext);
  

  const clickToFavorites = () => {
    additemToFavorites({ price, title, imageUrl, id });
  };

  const clickToAdd = () => {
    addSneakersToCart({ price, title, imageUrl, id });
  };

  return (
    <div className="item-sneakers">
      <img
        className="item-sneakers__button-like"
        onClick={clickToFavorites}
        src={wasAddedInFavorites(id) ? CheckLike : Like}
        alt="Like"
      />
      <div className="item-sneakers__image">
        <img src={imageUrl} alt="sneaker" />
      </div>
      <h3 className="item-sneakers__title">{title}</h3>
      <div className="item-sneakers__about">
        <div className="item-sneakers__body">
          <p className="item-sneakers__text">Цена:</p>
          <span className="item-sneakers__price">{price} руб. </span>
        </div>
        <div onClick={clickToAdd} className="item-sneakers__button-add  button">
          <img src={wasAddedInCart(id) ? CheckAdded : Added} alt="add" />
        </div>
      </div>
    </div>
  );
};

export default Card;
