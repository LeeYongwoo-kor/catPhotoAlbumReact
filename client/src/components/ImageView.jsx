import React, { Component } from "react";
// function ImageView() {
//   return <div></div>;
// }

class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isView: false,
      selectedFilePath: props.selectedFilePath ? props.selectedFilePath : null,
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    this.state((prevState) => ({
      ...this.state,
      isView: !prevState.isView,
    }));
  }

  render() {
    return (
      <>
        {this.state.isView ? (
          <div className="content">
            {this.state.selectedFilePath ? (
              <img
                src={this.state.selectedFilePath}
                alt="catImage"
                onClick={this.onClickHandler}
              />
            ) : null}
          </div>
        ) : null}
      </>
    );
  }
}

export default ImageView;
