import React from "react";
import Title from "../Title";

export default function EmptyCart() {
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title text-capitalize my-5">
          <Title name="MY CART IS" title="empty" />
          <i className="fas fa-bug fa-5x" color="green"></i>
        </div>
      </div>
    </div>
  );
}
