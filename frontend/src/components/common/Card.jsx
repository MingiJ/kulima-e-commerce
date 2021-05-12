import React, { Component } from 'react'

const Card = (props) =>{
    return(
        <div class="card">
            <img src="/images/veggies.jpg" alt="" class="card-img"/>

            <div class="card-body">
                <div class="card-bottom flex align-end justify-between">
                    <h2 class="card-title">{props.name}</h2>

                    <div class="price-box">
                        <span class="curr">kshs</span>
                        <span class="price">{props.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Card;