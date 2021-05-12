import React from "react";
import { Link } from "react-router-dom";
import Card from "../common/Card";

export default function ProductList({ products }) {
  return (
    <React.Fragment>
      {products.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`}>
          <Card
            name={product.name}
            price={product.price}
            image={product.image}
          />
        </Link>
      ))}
    </React.Fragment>
  );
}
