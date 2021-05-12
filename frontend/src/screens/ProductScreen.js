import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${count}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
          <Link to="/">Back to result</Link>
           <section class="product">

                <div class="product-header">
                    <div class="col">
                        <h1 class="product-title">{product.name}</h1>

                        <div class="product-price">
                            <span class="price">{product.price}</span>
                            <span class="curr">kshs</span>
                        </div>

                        <div class="flex align-center">

                            <div class="product-quantity flex flex-col">
                                <h2 class="mb-1">Kilos</h2>

                                <div class="flex align-center">
                                    <button class="btn" onClick={()=> count>1 ? setCount(count - 1 ):setCount(1)}>
                                        <i class="lni lni-minus"></i>
                                    </button>

                                    <span class="kilos">{count}</span>

                                    <button class="btn" onClick={()=> setCount(count+1)}>
                                        <i class="lni lni-plus"></i>
                                    </button>
                                </div>
                            </div>

                            <button class="btn"onClick={addToCartHandler}><i class="lni lni-cart mr-1" ></i>add to cart</button>
                        </div>
                    </div>

                    <div class="col">
                        <img src="/images/veggies.jpg" alt=""/>
                    </div>
                </div>

                <div class="product-body">
                    <div class="flex mb-3">
                        <div class="product-detail-box mr-3">
                            <h2 class="mb-1">Description</h2>
                            <p class="desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa enim pariatur distinctio dolorum labore, molestias ea earum voluptatum qui quas accusantium, eos doloribus, nam non ut autem quos doloremque eveniet.</p>
                        </div>

                        <div class="product-detail-box">
                            <h2 class="mb-1">Seller</h2>
                            <p class="desc">Karanja Farm</p>
                        </div>
                    </div>

                    <div class="product-reviews">
                        <h2 class="mb-1">Reviews</h2>
                    </div>
              </div>
        </section>

      </div>)}
  </div>
  
)}
