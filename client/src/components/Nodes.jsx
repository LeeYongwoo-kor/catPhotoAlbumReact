import React, { Component } from "react";
import { file, directory, prev, notfound } from "../util/assets.js";
// function Nodes() {
//   return <div></div>;
// }

class Nodes extends Component {
  constructor(props) {
    console.count("Nodes.constructor");
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleImgError = this.handleImgError.bind(this);
  }

  handleClick(nodeId) {
    const selectedNode = this.props.nodes.find((node) => node.id === +nodeId);
    this.props.onClickCallback(selectedNode);
  }

  handleClickBack() {
    this.props.onBackClickCallback();
  }

  handleImgError(e) {
    e.target.onerror = null; // prevents looping
    e.target.src = notfound;
  }

  render() {
    console.count("Nodes.render");
    const { isRoot, nodes } = this.props;
    return (
      <section>
        {!isRoot ? (
          <div className="Node" onClick={this.handleClickBack}>
            <img src={prev} alt="prev" onError={this.handleImgError} />
            <div>Back</div>
          </div>
        ) : null}
        {nodes?.map((node) => (
          <div
            key={node.id}
            className="Node"
            onClick={() => this.handleClick(node.id)}
          >
            <img
              src={node.type === "FILE" ? file : directory}
              alt="icon"
              onError={this.handleImgError}
            />
            <div>{node.name}</div>
          </div>
        ))}
      </section>
    );
  }
}

export default Nodes;
