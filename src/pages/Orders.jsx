import React from 'react';
import axios from 'axios';

import SkeletonSneakers from '../components/Card/SkeletonSneakers';
import InfoOnEmptyPage from '../components/InfoOnEmptyPage';
import Card from '../components/Card';
import UpsetEmoji from '../assets/img/emoji/upset.png';

const Orders = () => {
  const [purchasedSneaker, setPurchasedSneaker] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = React.useState(true);

  React.useEffect(() => {
    try {
      (async () => {
        const orderResponse = await axios.get('https://62d50aded4406e523551779b.mockapi.io/orders');
        setOrders(orderResponse.data.map((obj) => obj.items).flat());
        setIsLoadingOrders(false);
        setPurchasedSneaker(orderResponse.data);
      })();
    } catch (error) {
      alert('Произошла ошибка при запросе списка покупок с сервера');
      console.error('ERR');
    }
  }, []);

  const sneakerBlockInOrders = orders.map((objSneakersInOrders) => (
    <Card key={objSneakersInOrders.id} {...objSneakersInOrders} />
  ));

  const skeletons = [...new Array(8)].map((_, index) => <SkeletonSneakers key={index} />);
  return (
    <main className="main">
      <section className="hero">
        <div className="hero__container">
          <div className="hero__body">
            <div className="body-hero__title">
              <h1>Мои заказы</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="sneakers">
        <div className="sneakers__container">
          {
            <div className="sneakers__gird">
              {isLoadingOrders ? skeletons : sneakerBlockInOrders}
            </div>
          }
        </div>
      </section>
    </main>
  );
};

export default Orders;
