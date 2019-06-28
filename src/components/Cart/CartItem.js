import React, { Component } from "react";
export default class CartItem extends Component {
  render() {
    const { id, titulo, imagen, precio, total, cantidad } = this.props.item;
    const { increment, decrement, removeItem } = this.props.value;

    return (
      <div className="row text-capitalize text-center mb-2">
        <div className="col-10 mx-auto col-lg-2">
          <img
            src={imagen}
            style={{ width: "5rem", heigth: "5rem" }}
            className="img-fluid"
            alt=""
          />
        </div>
        <div className="col-10 mx-auto my-auto col-lg-2 ">
          <span className="d-lg-none">product :</span> {titulo}
        </div>
        <div className="col-10 mx-auto my-auto col-lg-2 ">
          <strong>
            <span className="d-lg-none">price :</span> ${precio}
          </strong>
        </div>
        <div className="col-10 mx-auto my-auto col-lg-2">
          <span
            className="btn btn-black mx-1"
            onClick={() => {
              return decrement(id);
            }}
          >
            -
          </span>
          <span className="btn mx-1 btn-count">{cantidad}</span>
          <span
            className="btn btn-black mx-1"
            onClick={() => {
              return increment(id);
            }}
          >
            +
          </span>
        </div>
        <div className="col-10 mx-auto my-auto col-lg-2 ">
          <div className="cart-icon" onClick={() => removeItem(id)}>
            <i className="fas fa-trash-alt" />
          </div>
        </div>

        <div className="col-10 mx-auto my-auto col-lg-2 ">
          <strong>
            <span className="d-lg-none">item total :</span> ${total}
            <hr className="d-lg-none" />
          </strong>
        </div>
      </div>
    );
  }
}
