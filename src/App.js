import React from 'react';
import axios from 'axios'
import { Routes, Route } from 'react-router-dom';

import AppContext from './context'

import Home from './pages/Home'
import Favorites from './pages/Favorites';

import { Drawer } from './components/Drawer';
import { Header } from './components/Header';

//! Есть проблема с удалением кроссвок из корзины (некоректно)



function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [sneakersInFavorites, setSneakersInFavorites] = React.useState([]);
  const [sneakersInCart, setSneakersInCart] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [changeSearchValue, setChangeSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      const sneakersResponse = await axios.get('https://62d50aded4406e523551779b.mockapi.io/sneakers');
      const favoritesResponse = await axios.get('https://62d50aded4406e523551779b.mockapi.io/favorites');
      const cartResponse = await axios.get('https://62d50aded4406e523551779b.mockapi.io/cart');

      setIsLoading(false)
      setSneakersInFavorites(favoritesResponse.data)
      setSneakersInCart(cartResponse.data)
      setSneakers(sneakersResponse.data)
    }
    fetchData()
  }, [])


  const onAdditemToCart = (objSneakersToCart) => {
    if (sneakersInCart.find((cartObj) => cartObj.id === objSneakersToCart.id)) {
      axios.delete(`https://62d50aded4406e523551779b.mockapi.io/cart/${objSneakersToCart.id}`);
      setSneakersInCart((prev) => prev.filter((cartObj) => cartObj.id !== objSneakersToCart.id))
    } else {
      axios.post('https://62d50aded4406e523551779b.mockapi.io/cart', objSneakersToCart);
      (setSneakersInCart((prev) => [...prev, objSneakersToCart]))
    }
  }

  const wasAddedInCart = (id) => {
    return sneakersInCart.some((objSneakersCart) => objSneakersCart.id === id);
  };


  const onAdditemToFavorites = (objSneakersToFavorites) => {
    if (sneakersInFavorites.find((favoritesObj) => favoritesObj.id === objSneakersToFavorites.id)) {
      axios.delete(`https://62d50aded4406e523551779b.mockapi.io/favorites/${objSneakersToFavorites.id}`);
    } else {
      axios.post('https://62d50aded4406e523551779b.mockapi.io/favorites', objSneakersToFavorites);
      (setSneakersInFavorites((prev) => [...prev, objSneakersToFavorites]))
    }
  }


  const onDeleteItemInCart = (id) => {
    axios.delete(`https://62d50aded4406e523551779b.mockapi.io/cart/${id}`);
    (setSneakersInCart((prev) => prev.filter(item => item.id !== id)))
  }

  const onChangeSearchValue = (event) => {
    setChangeSearchValue(event.target.value);
  }


  //const offScroll = (document.body.style.overflow = 'hidden')

  return (
    <AppContext.Provider value={{ sneakers, sneakersInFavorites, sneakersInCart, isLoading, onAdditemToFavorites, onAdditemToCart, wasAddedInCart }} >
      <div className="wrapper" >
        <div className="wrapper-container">

          {cartOpened && <Drawer sneakersInCart={sneakersInCart} closeCart={() => setCartOpened(false)} onDeleteItemInCart={onDeleteItemInCart} />}

          <Header openCart={() => setCartOpened(true)} />

          <Routes>
            <Route path='/' element={<Home
              sneakersInCart={sneakersInCart}
              changeSearchValue={changeSearchValue}
              onChangeSearchValue={onChangeSearchValue}
              sneakers={sneakers}
              onAdditemToCart={onAdditemToCart}
              setChangeSearchValue={setChangeSearchValue}
              onAdditemToFavorites={onAdditemToFavorites}
              isLoading={isLoading}
            />} />
            <Route path='favorites' element={<Favorites />} />
          </Routes>
        </div>
      </div >
    </AppContext.Provider >
  );
}

export default App;
