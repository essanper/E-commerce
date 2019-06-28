import React from "react";
import Title from "./Title";

export default function Default(props) {
  console.log(props);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="card col-6 mx-auto text-center text-slanted my-5">
          <div className="card-body">
            <Title name="ERROR" title="404" />
            <h3>
              The requested URL{" "} <span className="text-danger">"{props.location.pathname}"</span> was not found
            </h3><hr />
            <a className="App-link" href="/"> <i className="fas fa-2x fa-reply-all"></i> back to products </a>
          </div>
        </div>
      </div>
    </div>
  );
}
