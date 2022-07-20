import React from 'react';

import { Card } from './components/Card';
import { Drawer } from './components/Drawer';
import { Header } from './components/Header';

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [sneakersInCart, setSneakersInCart] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://62d50aded4406e523551779b.mockapi.io/sneakers')
      .then((response) => {
        return response.json()
      })
      .then((json) => setSneakers(json))
  }, [])

  const onAdditemToCart = (objSneakersToCart) => {
    setSneakersInCart((prev) => [...prev, objSneakersToCart])
  }


  return (
    <div className="wrapper">
      <div className="wrapper-container">

        {cartOpened && <Drawer sneakersInCart={sneakersInCart} closeCart={() => setCartOpened(false)} />}
        <Header openCart={() => setCartOpened(true)} />
        <main className="main">
          <section className="hero">
            <div className="hero__container">
              <div className="hero__body">
                <div className="body-hero__title">
                  <h1>Все кроссовки</h1>
                </div>
                <div className="body-hero__search">
                  <input type="text" placeholder="Поиск" />
                </div>
              </div>
            </div>
          </section>
          <section className="sneakers">
            <div className="sneakers__container">
              <div className="sneakers__gird">
                {sneakers.map((objSneakers) => (
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
    </div>
  );
}

export default App;
