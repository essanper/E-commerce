import React, { Component } from "react";
import Product from "./Product";

export default class ProductAll extends Component {
  render() {
    const { value } = this.props;
    
    return (
      <div className="container">
        <div className="row">
          {this.props.value.products.map(product => (
            <Product key={product.id} product={product} value={value}/>
          ))}
        </div>
      </div>
    );
  }
}
