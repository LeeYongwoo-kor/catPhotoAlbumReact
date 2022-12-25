import React, { Component } from "react";
// function Breadcrumb() {
//   return <div></div>;
// }

class Breadcrumb extends Component {
  static defaultProps = {
    initialState: [],
  };
  constructor(props) {
    super(props);
    this.state = props.initialState;
    this.onClickHanlder = this.onClickHandler.bind(this);
  }

  onClickHandler(idx) {
    this.props.onClickCallback(idx);
  }

  render() {
    return (
      <>
        <span class="nav-item">root</span>
        {this.state.map((node, idx) => (
          <span
            key={idx}
            className="nav-item"
            onClick={this.onClickHandler(idx)}
          >
            → [{node.name}]
          </span>
        ))}
      </>
    );
  }
}

export default Breadcrumb;
