import React from 'react';
import Card from '../components/Card';

const Favorites = ({ sneakersInFavorites, onAdditemToFavorites, onAdditemToCart }) => {
  return (
    <main className="main">
      <section className="hero">
        <div className="hero__container">
          <div className="hero__body">
            <div className="body-hero__title">
              <h1>Мои закладки</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="sneakers">
        <div className="sneakers__container">
          <div className="sneakers__gird">
            {sneakersInFavorites.map((objSneakersInFavorites) => (
              <Card
                key={objSneakersInFavorites.id}
                {...objSneakersInFavorites}
                addSneakersToCart={(objSneakersToCart) => onAdditemToCart(objSneakersToCart)}
                additemToFavorites={(objSneakersToFavorites) =>
                  onAdditemToFavorites(objSneakersToFavorites)
                }
                favorited={true}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Favorites;
