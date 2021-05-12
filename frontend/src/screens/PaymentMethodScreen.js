import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
        <h1 class="page-title mt-4 mb-4">payment method</h1>
        </div>
        <div>
          <div className='input-group flex align-center justify-between'>
            <h2>PayPal</h2>
            <input
              
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <div className='input-group flex align-center justify-between'>
            <h2 htmlFor="stripe">Stripe</h2>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <label />
          <button className="btn" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
