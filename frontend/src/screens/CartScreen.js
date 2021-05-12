import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import CartCard from "../components/common/CartCard";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  console.log(cartItems[0]);
  return (
    <section class="cart flex">
      <div class="col">
        <h1 class="page-title mb-4 mt-3">cart</h1>
        {cartItems.length === 0 && (
          <h1>
            Cart is empty.<Link to="/">Go Shopping</Link>
          </h1>
        )}
        {cartItems &&
          cartItems.map((item) => (
            <CartCard
              removeFromCartHandler={removeFromCartHandler}
              item={item}
            />
          ))}
      </div>

      <div class="col flex flex-col align-center">
        <div class="flex align-center mb-2">
          <h3 class="mr-2">TOTAL PRICE</h3>

          <div class="product-price">
            <span class="price">
              {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </span>
            <span class="curr">kshs</span>
          </div>
        </div>

        <button
          type="button"
          onClick={checkoutHandler}
          className="btn"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
}
