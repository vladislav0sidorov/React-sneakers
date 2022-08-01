import React from 'react';

import DeleteButton from '../../assets/img/hero/delete-btn.svg';
import Arrow from '../../assets/img/hero/arrow.svg';
import { CartEmprty } from '../CartEmpty';

export const Drawer = ({ closeCart, onDeleteItemInCart, sneakersInCart = [] }) => {
  return (
    <div className="overlay">
      <div className="overlay-drawer">
        <div className="overlay-container">
          <div className="overlay-column__row">
            <div className="overlay-content">
              <h2 className="overlay-content__title">Корзина</h2>
              {sneakersInCart.length > 0 ? (
                <img onClick={closeCart} src={DeleteButton} alt="Close" />
              ) : (
                <div></div>
              )}
            </div>
            {sneakersInCart.length > 0 ? (
              <>
                <div className="overlay__items ">
                  {sneakersInCart.map((objSneakersInCart) => (
                    <div key={objSneakersInCart.id} className="item-overlay">
                      <div className="item-overlay__row">
                        <div className="item-overlay__image">
                          <img src={objSneakersInCart.imageUrl} alt="Sneakers" />
                        </div>
                        <div className="item-overlay__body">
                          <div className="item-overlay__body_title">
                            <h4>{objSneakersInCart.title}</h4>
                            <p>{objSneakersInCart.price}руб.</p>
                          </div>
                        </div>
                        <div className="item-overlay__delete-btn">
                          <img
                            onClick={() => onDeleteItemInCart(objSneakersInCart.id)}
                            key={objSneakersInCart.id}
                            src={DeleteButton}
                            alt=""
                            className="delete-btn"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  ;
                </div>
                <div className="overlay-price">
                  <div className="overlay-price__body">
                    <div className="overlay-price__sum">
                      <ul>
                        <li>
                          <span>Итого:</span>
                          <div className="overlay-price__dashed"></div>
                          <b>23241 руб.</b>
                        </li>
                        <li>
                          <span>Налог 5%:</span>
                          <div className="overlay-price__dashed"></div>
                          <b>2324 руб.</b>
                        </li>
                      </ul>
                      <button className="overlay-price__green-button">
                        Оформить заказ <img src={Arrow} alt="Arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <CartEmprty closeCart={closeCart} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
