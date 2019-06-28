import React, { Component } from "react";

export default class ProductFilter extends Component {
  render() {
    const { filterAndOrderBy } = this.props.value;

    return (
      <div className="container section-filter mb-3">
        <div className="row">
          <div className="col-10 mx-auto my-auto col-lg-3">
            <div className="form-group">
              <label>Filter:</label>
              <select className="form-control" id="selectFilter"
                onChange={() => { return filterAndOrderBy(document.getElementById("selectFilter").value, document.getElementById("selectOrderBy").value)}}>
                <option>all products</option>
                <option>Tecnology</option>
                <option>Sport</option>
              </select>
            </div>
          </div>

          <div className="col-10 mx-auto my-auto col-lg-3">
            <div className="form-group">
              <label>Order by:</label>
              <select className="form-control" id="selectOrderBy"
                onChange={() => { return filterAndOrderBy(document.getElementById("selectFilter").value, document.getElementById("selectOrderBy").value)}}>
                <option>Indiferent</option>
                <option>Title</option>
                <option>Price</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
