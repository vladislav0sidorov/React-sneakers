import React from 'react';

import SkeletonSneakers from '../components/Card/SkeletonSneakers';
import Card from '../components/Card';

import DeleteButton from '../assets/img/hero/delete-btn.svg';

const Home = ({
  changeSearchValue,
  onChangeSearchValue,
  sneakers,
  onAdditemToCart,
  setChangeSearchValue,
  onAdditemToFavorites,
  isLoading,
}) => {
  const sneakerBlock = sneakers
    .filter((objSneakers) =>
      objSneakers.title.toLowerCase().includes(changeSearchValue.toLowerCase()),
    )
    .map((objSneakers) => (
      <Card
        key={objSneakers.id}
        {...objSneakers}
        addSneakersToCart={(objSneakersToCart) => onAdditemToCart(objSneakersToCart)}
        additemToFavorites={(objSneakersToFavorites) =>
          onAdditemToFavorites(objSneakersToFavorites)
        }
      />
    ));

  const skeletons = [...new Array(16)].map((_, index) => <SkeletonSneakers key={index} />);

  return (
    <main className="main">
      <section className="hero">
        <div className="hero__container">
          <div className="hero__body">
            <div className="body-hero__title">
              <h1>
                {changeSearchValue ? `Поиск по запросу "${changeSearchValue}"` : 'Все кроссовки'}
              </h1>
            </div>
            <div className="body-hero__search">
              <input
                onChange={onChangeSearchValue}
                value={changeSearchValue}
                type="text"
                placeholder="Поиск"
              />
              {changeSearchValue && (
                <img
                  className="body-hero__search-delete"
                  onClick={() => {
                    setChangeSearchValue('');
                  }}
                  src={DeleteButton}
                  alt="DeleteButton"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="sneakers">
        <div className="sneakers__container">
          <div className="sneakers__gird">{isLoading ? skeletons : sneakerBlock}</div>
        </div>
      </section>
    </main>
  );
};

export default Home;
