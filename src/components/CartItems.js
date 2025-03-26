import React from 'react'
import { useSelector } from "react-redux";

function CartItems() {
    const cartItems = useSelector((state) => state.cart.cartItems || []); // ✅ Ensure it's an array
        console.log("Add to Cart", cartItems);
  return (
    <div>CartItems</div>
  )
}

export default CartItems