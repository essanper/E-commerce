import React, { Component } from "react";
// import Product from "./Product";
import Title from "../Title";
import { storeProducts } from "../../data";
import styled from "styled-components";
import { ProductConsumer } from "../../context";
import ProductFilter from "./ProductFilter";
import ProductAll from "./ProductAll";

export default class ProductList extends Component {
  render() {

    return (
      <section>
        <ProductConsumer>
          {value => {
              return (
                <React.Fragment>
                  <ProductWrapper>
                    <div className="container my-3">
                      <Title name="our" title="products" />
                        <div className="row">
                          <ProductFilter value={value}/>
                          <ProductAll value={value} />
                        </div>
                    </div>
                  </ProductWrapper>
                </React.Fragment>
              );
          }}
      </ProductConsumer>
    </section>
    );
  }
}

const ProductWrapper = styled.section``;
