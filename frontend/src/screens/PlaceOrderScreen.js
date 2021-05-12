import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <section class="cart flex">
          <div class="col">
              <h1 class="page-title mb-3 mt-3">shipping</h1>

              <div className="pd-3 br-2 bg-swatch-2">
                  <div className="flex align-center">
                    <h1 className="page-title mr-2">Address:</h1>
                    <h1 className="fw-300">{cart.shippingAddress.address}</h1>
                  </div>
              </div>

              <h1 class="page-title mb-3 mt-3">Payment</h1>

              <div className="pd-3 br-2 bg-swatch-2">
                  <div className="flex align-center">
                    <h1 className="page-title mr-2">Method:</h1>
                    <h1 className="fw-300">{cart.paymentMethod}</h1>
                  </div>
              </div>

              <h1 class="page-title mb-3 mt-3">Order Items</h1>

              <div className="pd-3 br-2 bg-swatch-2">
                {
                  cart.cartItems.map(item =>(
                  <div className="flex align-start">
                    <img src={item.image} className='small-img mr-2' alt={item.name}/>
                    <h1>{item.name}</h1>
                  </div>
                  ))}
              </div>


              <h1 class="page-title mb-3 mt-3">Order Summary</h1>

              <div className="pd-3 br-2 bg-swatch-2">
                  <div className="flex align-start justify-between">
                    <h1 className="page-title mr-2">Items</h1>
                    <h1 className="fw-300">{cart.itemsPrice.toFixed(2)}</h1>
                  </div>

                  <div className="flex align-start justify-between">
                    <h1 className="page-title mr-2">Shipping Price</h1>
                    <h1 className="fw-300">{cart.shippingPrice.toFixed(2)}</h1>
                  </div>

                  <div className="flex align-start justify-between">
                    <h1 className="page-title mr-2">Tax</h1>
                    <h1 className="fw-300">{cart.taxPrice.toFixed(2)}</h1>
                  </div>

                  <div className="flex align-start justify-between">
                    <h1 className="page-title mr-2">Order Total</h1>
                    <h1 className="fw-300">{cart.totalPrice.toFixed(2)}</h1>
                  </div>
              </div>
              
              
      
              
          </div>

          <div class="col flex flex-col align-center">
              <div class="flex align-center mb-2">
                  <h3 class="mr-2">TOTAL PRICE</h3>

                  <div class="product-price">
                      <span class="price">{cart.totalPrice}</span>
                      <span class="curr">kshs</span>
                  </div>
              </div>

              <button
                type="button"
                onClick={placeOrderHandler}
                className="btn"
              >
                Proceed to Checkout
              </button>
          </div>
  </section>
  );
}
