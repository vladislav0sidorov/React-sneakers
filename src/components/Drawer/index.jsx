import React from 'react';
import axios from 'axios';

import DeleteButton from '../../assets/img/hero/delete-btn.svg';
import Arrow from '../../assets/img/hero/arrow.svg';
import EmptyBox from "../../assets/img/hero/cart/empty-box.png";
import { CartInfo } from '../CartInfo';

import { useTotalCalc } from '../../hooks/useTotalCalc';

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000))

export const Drawer = ({ closeCart, onDeleteItemInCart }) => {
const [orderIsProcessed, setOrderIsProcessed] = React.useState(false)
const [orderId, setOrderId] = React.useState(null)
const {sneakersInCart, setSneakersInCart, totalPrice} = useTotalCalc()



const onClickToOrder = async () => {
  try {
    setOrderIsProcessed(true)
    const {data} = await axios.post('https://62d50aded4406e523551779b.mockapi.io/orders', {items: sneakersInCart})
    setOrderId(data.id)
    setSneakersInCart([])
    for (let i = 0; i < sneakersInCart.length; i++) {
      const items = sneakersInCart[i];
      await axios.delete('https://62d50aded4406e523551779b.mockapi.io/cart/' +items.id )
      await delay(100)
    }
  } catch (error) {
    alert('Не удалось создать заказ! :(')
  }
  // доделать истрию с картом 
}

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
                            <p>{objSneakersInCart.price} руб.</p>
                          </div>
                        </div>
                        <div className="item-overlay__delete-btn">
                          <img
                            onClick={() => onDeleteItemInCart(objSneakersInCart.id)}
                            key={objSneakersInCart.id}
                            src={DeleteButton}
                            alt="DeleteButton"
                            className="delete-btn"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="overlay-price">
                  <div className="overlay-price__body">
                    <div className="overlay-price__sum">
                      <ul>
                        <li>
                          <span>Итого:</span>
                          <div className="overlay-price__dashed"></div>
                          <b>{totalPrice} руб.</b>
                        </li>
                        <li>
                          <span>Налог 5%:</span>
                          <div className="overlay-price__dashed"></div>
                          <b>{Math.round(totalPrice * 0.05)} руб.</b>
                        </li>
                      </ul>
                      <button onClick={onClickToOrder} className="overlay-price__green-button">
                        Оформить заказ <img src={Arrow} alt="Arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <CartInfo closeCart={closeCart} title={orderIsProcessed ? 'Заказ оформлен' :'Корзина пуста' } text={orderIsProcessed ? `Ваш заказ № ${orderId} скоро будет передан курьерской доставке` :'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'} image={EmptyBox}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
