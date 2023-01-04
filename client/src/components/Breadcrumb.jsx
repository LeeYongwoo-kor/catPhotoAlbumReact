import React, { Component } from "react";
// function Breadcrumb() {
//   return <div></div>;
// }

class Breadcrumb extends Component {
  constructor(props) {
    console.count("Breadcrumb.constructor");
    super(props);
    this.onClickHanlder = this.onClickHandler.bind(this);
  }

  onClickHandler(idx) {
    this.props.onClickCallback(idx);
  }

  render() {
    console.count("Breadcrumb.render");
    const { depth } = this.props;
    return (
      <nav className="Breadcrumb">
        <span className="nav-item" onClick={() => this.onClickHandler(null)}>
          root
        </span>
        {depth?.map((node, idx) => (
          <span
            key={idx}
            className="nav-item"
            onClick={() => this.onClickHandler(idx)}
          >
            → [{node.name}]
          </span>
        ))}
      </nav>
    );
  }
}

export default Breadcrumb;
