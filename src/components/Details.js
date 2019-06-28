import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
import Title from "./Title";

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            empresa,
            imagen,
            descripcion,
            precio,
            titulo,
            comprado
          } = value.detailProduct;

          return (
            <div className="container my-5">
            {
              titulo ?
              (<div>
                {/* title */}
              	<div className="row">
              	 <div className="col-10 mx-auto text-center text-slanted text-blue">
              	  <h1 className="text-title">{titulo}</h1>
              	 </div>
              	</div>
              	{/* end of title */}
              	<div className="row">
              	 <div className="col-10 mx-auto col-md-6 my-3">
              	  <img src={imagen} className="img-fluid" alt="" />
              	 </div>
              	 {/* prdoduct info */}
              	 <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
              	 <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
              	  made by : <span className="text-uppercase">{empresa}</span>
              	 </h4>
              	 <h4 className="text-blue">
              	  <strong>price : <span>$</span>{precio}</strong>
                 </h4>
              	 <p className="text-capitalize font-weight-bold mt-3 mb-0">
              	  some info about product :
              	 </p>
              	 <p className="text-muted lead text-justify">{descripcion}</p>
              	 {/* buttons */}
              	 <div>
              	 <Link to="/">
              	  <ButtonContainer>back to products</ButtonContainer>
              	 </Link>
              	  <ButtonContainer
              	   cart
              		 disabled={comprado ? true : false}
              		 onClick={() => {
              		  value.addToCart(id);
              		  value.openModal(id);
              		  }}
                  >
              		  {comprado ? "in cart" : "add to cart"}
              		</ButtonContainer>
              </div>
              </div>
              </div>
              </div>)
              :
              (<div className="card col-6 mx-auto text-center text-slanted my-5">
                <div className="card-body">
                  <Title name="ERROR" title="DETAILS" />
                  <h3>First choose a product for view your details</h3>
                  <hr />
                  <a className="App-link" href="/"> <i className="fas fa-2x fa-reply-all"></i> back to products </a>
                </div>
              </div>)
            }
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
