import React from 'react'
import AppContext from '../context'

export const useTotalCalc = () => {
    const {sneakersInCart, setSneakersInCart } = React.useContext(AppContext);

    const totalPrice = sneakersInCart.reduce((sum, object) => Number(object.price.replace(/\s/g, '')) + Number(sum), 0);
//

    return {sneakersInCart, totalPrice, setSneakersInCart}
}
