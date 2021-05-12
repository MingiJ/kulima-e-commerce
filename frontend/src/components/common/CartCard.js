import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

import { addToCart } from '../../actions/cartActions'

export default function CartCard(props) {
    const {item} = props;
    const {id: productId} = useParams()
    const [count, setCount] = useState(item.qty)
    const dispatch = useDispatch();


    return (
        <div>
            <div class="flex cart-card">
                  <img src="/assets/img/veggies.jpg" alt="" class="small-img mr-2"/>

                  <div class="">
                      <div class="flex justify-between align-start">
                          <h1 class="">{item.name}</h1>

                          <div class="product-price">
                              <span class="price">{item.price}</span>
                              <span class="curr">kshs</span>
                          </div>
                      </div>
                      <h2 class="mb-1"></h2>

                      <div class="flex">
                          <div class="product-quantity flex flex-col">
                              <h2 class="mb-1">Kilos</h2>

                              <div class="flex align-center">
                                    <button class="btn" onClick={()=> {
                                        if (count<1) {
                                            setCount(1)
                                        } else {
                                            setCount(count-1)
                                        }

                                        dispatch(addToCart(productId,count));
                                    }}>
                                        <i class="lni lni-minus"></i>
                                    </button>

                                    <span class="kilos">{count}</span>

                                    <button class="btn" onClick={()=> {
                                        setCount(count + 1)
                                        dispatch(addToCart(productId,count));
                                    }}>
                                        <i class="lni lni-plus"></i>
                                    </button>
                              </div>
                          </div>

                          <div class="flex align-center">
                              <div class="flex align-center mr-4 in-stock">
                                  <i class="lni lni-checkmark"></i>
                                  <span>In Stock</span>
                              </div>

                              <button class="btn" onClick={() => props.removeFromCartHandler(productId)}>remove</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        
    )
}
