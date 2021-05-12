import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import ProductList from '../components/products/ProductList';


export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <section class="home">
            <div class="page-section mt-4">
                <h1 class="page-title">freshest produce</h1>

                <div class="mt-3 grid">
                    {products && <ProductList products={products}/>}
                </div>
            </div>
            
            <div class="page-section mt-4">
                <h1 class="page-title">categories</h1>

                <div class="mt-3">
                    <div class="flex flex-row">
                        <div class="flex flex-col mr-5">
                            <div class="pill mb-2">
                                <h2 class="pill-title">cereals</h2>
                            </div>

                            <div class="pill mb-2">
                                <h2 class="pill-title">legumes</h2>
                            </div>
                        </div>
                    
                        <div class="flex flex-col">
                            <div class="pill mb-2">
                                <h2 class="pill-title">vegetables</h2>
                            </div>

                            <div class="pill mb-2">
                                <h2 class="pill-title">fruits</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  );
}
