import React from 'react';
import axios from 'axios'


import { Card } from './components/Card';
import { Drawer } from './components/Drawer';
import { Header } from './components/Header';
import DeleteButton from './assets/img/hero/delete-btn.svg';

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [sneakersInCart, setSneakersInCart] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [changeSearchValue, setChangeSearchValue] = React.useState('');

  React.useEffect(() => {
    axios.get('https://62d50aded4406e523551779b.mockapi.io/sneakers').then((res) => {
      setSneakers(res.data)
    })
    axios.get('https://62d50aded4406e523551779b.mockapi.io/cart').then((res) => {
      setSneakersInCart(res.data)
    })
  }, [])

  const onAdditemToCart = (objSneakersToCart) => {
    axios.post('https://62d50aded4406e523551779b.mockapi.io/cart', objSneakersToCart);
    (setSneakersInCart((prev) => [...prev, objSneakersToCart]))
  }

  const onDeleteItemInCart = (id) => {
    axios.delete(`https://62d50aded4406e523551779b.mockapi.io/cart/${id}`);
    (setSneakersInCart((prev) => prev.filter(item => item.id !== id)))
  }

  const onChangeSearchValue = (event) => {
    setChangeSearchValue(event.target.value);
  }

  return (

    <div className="wrapper" >
      <div className="wrapper-container">
        {cartOpened && <Drawer sneakersInCart={sneakersInCart} closeCart={() => setCartOpened(false)} onDeleteItemInCart={onDeleteItemInCart} />}
        <Header openCart={() => setCartOpened(true)} />
        <main className="main">
          <section className="hero">
            <div className="hero__container">
              <div className="hero__body">
                <div className="body-hero__title">
                  <h1>{changeSearchValue ? `Поиск по запросу "${changeSearchValue}"` : "Все кроссовки"}</h1>
                </div>
                <div className="body-hero__search">
                  <input onChange={onChangeSearchValue} value={changeSearchValue} type="text" placeholder="Поиск" />
                  {changeSearchValue && <img className="body-hero__search-delete" onClick={() => { setChangeSearchValue('') }} src={DeleteButton} alt="DeleteButton" />}
                </div>
              </div>
            </div>
          </section>
          <section className="sneakers">
            <div className="sneakers__container">
              <div className="sneakers__gird">
                {sneakers
                  .filter((objSneakers) => objSneakers.title.toLowerCase().includes(changeSearchValue.toLowerCase()))
                  .map((objSneakers) => (
                    <Card
                      key={objSneakers.id}
                      {...objSneakers}
                      addSneakersToCart={(objSneakersToCart) => onAdditemToCart(objSneakersToCart)}
                    />
                  ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div >
  );
}

export default App;
