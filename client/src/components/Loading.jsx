import React, { Component } from "react";
import { loading } from "../util/assets.js";
// function Loading() {
//   return <div></div>;
// }

class Loading extends Component {
  constructor(props) {
    console.count("Loading.constructor");
    super(props);
  }

  render() {
    console.count("Loading.render");
    const { isLoading } = this.props;
    return (
      <>
        {isLoading ? (
          <div className="Loading Modal">
            <div className="content">
              <img src={loading} alt="loadingImage" />
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Loading;
