import React, { Component } from "react";
import { loading } from "../util/assets.js";
// function Loading() {
//   return <div></div>;
// }

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <div className="content">
            <img src={loading} alt="loadingImage" />
          </div>
        ) : null}
      </>
    );
  }
}

export default Loading;
