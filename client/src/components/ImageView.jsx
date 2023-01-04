import React, { Component } from "react";
// function ImageView() {
//   return <div></div>;
// }

class ImageView extends Component {
  constructor(props) {
    console.count("ImageView.constructor");
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    this.props.onClickCallback();
  }

  render() {
    console.count("ImageView.render");
    const { selectedFilePath } = this.props;
    return (
      <>
        {selectedFilePath ? (
          <div className="ImageView Modal">
            <div className="content">
              <img
                src={selectedFilePath}
                alt="catImage"
                onClick={this.onClickHandler}
              />
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

ImageView.defaultProps = {
  selectedFilePath: null,
};

export default ImageView;
