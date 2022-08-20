import React from 'react';
import axios from 'axios'
import { Routes, Route } from 'react-router-dom';

import AppContext from './context'

import Home from './pages/Home'
import Favorites from './pages/Favorites';

import { Drawer } from './components/Drawer';
import { Header } from './components/Header';
import Orders from './pages/Orders';

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
      try {
        const [sneakersResponse, favoritesResponse, cartResponse] = await Promise.all([
          axios.get('https://62d50aded4406e523551779b.mockapi.io/sneakers'),
          axios.get('https://62d50aded4406e523551779b.mockapi.io/favorites'),
          axios.get('https://62d50aded4406e523551779b.mockapi.io/cart'),
        ])

        setIsLoading(false)
        setSneakersInFavorites(favoritesResponse.data)
        setSneakersInCart(cartResponse.data)
        setSneakers(sneakersResponse.data)
      } catch (error) {
        alert('Произошла ошибка при получении сникеров с сервера')
        console.error('ERR');
      }
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    if (cartOpened) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'

    }
  }, [cartOpened])


  const onAdditemToCart = async (objSneakersToCart) => {
    try {
      const findItemInCart = sneakersInCart.find((cartObj) => cartObj.parentId === objSneakersToCart.id)
      if (findItemInCart) {
        setSneakersInCart((prev) => prev.filter((cartObj) => cartObj.parentId !== objSneakersToCart.id))
        await axios.delete(`https://62d50aded4406e523551779b.mockapi.io/cart/${findItemInCart.id}`);
      } else {
        (setSneakersInCart((prev) => [...prev, objSneakersToCart]))
        await axios.post('https://62d50aded4406e523551779b.mockapi.io/cart', objSneakersToCart);
      }
    } catch (error) {
      alert('Произошла ошибка при добавлении пары в корзину.')
      console.error('ERR');
    }
  }

  const onAdditemToFavorites = async (objSneakersToFavorites) => {
    try {
      const findItemInFavorites = sneakersInFavorites.find((favoritesObj) => favoritesObj.id === objSneakersToFavorites.id)
      if (findItemInFavorites) {
        setSneakersInFavorites((prev) => prev.filter((favoritesObj) => favoritesObj.id !== objSneakersToFavorites.id))
        await axios.delete(`https://62d50aded4406e523551779b.mockapi.io/favorites/${findItemInFavorites.id}`);
      } else {
        (setSneakersInFavorites((prev) => [...prev, objSneakersToFavorites]))
        await axios.post('https://62d50aded4406e523551779b.mockapi.io/favorites', objSneakersToFavorites);
      }
    } catch (error) {
      alert('Произошла ошибка при добавлении пары в понравившиеся.')
      console.error('ERR');
    }
  }

  const onDeleteItemInCart = async (id) => {
    try {
      (setSneakersInCart((prev) => prev.filter(item => item.id !== id)))
      await axios.delete(`https://62d50aded4406e523551779b.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Произошла ошибка при удалении пары из корзины.')
      console.error('ERR');
    }
  }

  const wasAddedInCart = (id) => {
    return sneakersInCart.some((objSneakersCart) => objSneakersCart.parentId === id);
  };

  const wasAddedInFavorites = (id) => {
    return sneakersInFavorites.some((objSneakerstFavorites) => objSneakerstFavorites.id === id)
  };

  const onChangeSearchValue = (event) => {
    setChangeSearchValue(event.target.value);
  }





  return (
    <AppContext.Provider value={{ sneakers, sneakersInFavorites, sneakersInCart, setSneakersInCart, isLoading, onAdditemToFavorites, onAdditemToCart, wasAddedInCart, wasAddedInFavorites }} >
      <div className="wrapper" >
        <div className="wrapper-container">

          {cartOpened && <Drawer closeCart={() => setCartOpened(false)} onDeleteItemInCart={onDeleteItemInCart} />}

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
            <Route path='orders' element={<Orders />} />
          </Routes>
        </div>
      </div >
    </AppContext.Provider >
  );
}

export default App;
